-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom enum types
CREATE TYPE user_role AS ENUM ('member', 'admin', 'owner');
CREATE TYPE board_type AS ENUM ('strategic', 'swot', 'okr', 'roadmap', 'brainstorm');
CREATE TYPE item_type AS ENUM (
  'note', 'objective', 'task', 'milestone', 'risk', 'idea',
  'swot-strength', 'swot-weakness', 'swot-opportunity', 'swot-threat',
  'okr-objective', 'okr-keyresult'
);
CREATE TYPE item_color AS ENUM ('gold', 'blue', 'green', 'purple', 'red', 'orange', 'cyan', 'pink');
CREATE TYPE priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE status AS ENUM ('todo', 'in-progress', 'completed', 'blocked');
CREATE TYPE room_type AS ENUM ('general', 'strategic', 'announcements', 'private');
CREATE TYPE post_type AS ENUM ('discussion', 'announcement', 'update');

-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  organization_id UUID REFERENCES organizations(id),
  role user_role DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Boards table
CREATE TABLE boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  board_type board_type DEFAULT 'strategic',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Board items table
CREATE TABLE board_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
  type item_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  position JSONB NOT NULL, -- {x: number, y: number}
  color item_color DEFAULT 'gold',
  priority priority DEFAULT 'medium',
  status status DEFAULT 'todo',
  assignee_id UUID REFERENCES auth.users(id),
  due_date TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_item_id UUID REFERENCES board_items(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rooms table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type room_type DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type post_type DEFAULT 'discussion',
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Post replies table
CREATE TABLE post_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_organization ON profiles(organization_id);
CREATE INDEX idx_boards_organization ON boards(organization_id);
CREATE INDEX idx_boards_created_by ON boards(created_by);
CREATE INDEX idx_board_items_board ON board_items(board_id);
CREATE INDEX idx_board_items_assignee ON board_items(assignee_id);
CREATE INDEX idx_board_items_status ON board_items(status);
CREATE INDEX idx_comments_board_item ON comments(board_item_id);
CREATE INDEX idx_rooms_organization ON rooms(organization_id);
CREATE INDEX idx_posts_room ON posts(room_id);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_post_replies_post ON post_replies(post_id);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_replies ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their organization" ON profiles
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for organizations
CREATE POLICY "Users can view their organization" ON organizations
  FOR SELECT USING (
    id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Organization owners can update organization" ON organizations
  FOR UPDATE USING (
    id IN (
      SELECT organization_id FROM profiles 
      WHERE id = auth.uid() AND role = 'owner'
    )
  );

-- RLS Policies for boards
CREATE POLICY "Users can view boards in their organization" ON boards
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can create boards in their organization" ON boards
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    ) AND created_by = auth.uid()
  );

CREATE POLICY "Board creators and admins can update boards" ON boards
  FOR UPDATE USING (
    created_by = auth.uid() OR 
    organization_id IN (
      SELECT organization_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Board creators and admins can delete boards" ON boards
  FOR DELETE USING (
    created_by = auth.uid() OR 
    organization_id IN (
      SELECT organization_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'owner')
    )
  );

-- RLS Policies for board_items
CREATE POLICY "Users can view board items in their organization" ON board_items
  FOR SELECT USING (
    board_id IN (
      SELECT b.id FROM boards b
      JOIN profiles p ON p.organization_id = b.organization_id
      WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can create board items" ON board_items
  FOR INSERT WITH CHECK (
    board_id IN (
      SELECT b.id FROM boards b
      JOIN profiles p ON p.organization_id = b.organization_id
      WHERE p.id = auth.uid()
    ) AND created_by = auth.uid()
  );

CREATE POLICY "Users can update board items they created or are assigned to" ON board_items
  FOR UPDATE USING (
    created_by = auth.uid() OR 
    assignee_id = auth.uid() OR
    board_id IN (
      SELECT b.id FROM boards b
      JOIN profiles p ON p.organization_id = b.organization_id
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Users can delete board items they created" ON board_items
  FOR DELETE USING (
    created_by = auth.uid() OR
    board_id IN (
      SELECT b.id FROM boards b
      JOIN profiles p ON p.organization_id = b.organization_id
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'owner')
    )
  );

-- RLS Policies for comments
CREATE POLICY "Users can view comments on accessible board items" ON comments
  FOR SELECT USING (
    board_item_id IN (
      SELECT bi.id FROM board_items bi
      JOIN boards b ON b.id = bi.board_id
      JOIN profiles p ON p.organization_id = b.organization_id
      WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can create comments" ON comments
  FOR INSERT WITH CHECK (
    board_item_id IN (
      SELECT bi.id FROM board_items bi
      JOIN boards b ON b.id = bi.board_id
      JOIN profiles p ON p.organization_id = b.organization_id
      WHERE p.id = auth.uid()
    ) AND author_id = auth.uid()
  );

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (author_id = auth.uid());

-- RLS Policies for rooms
CREATE POLICY "Users can view rooms in their organization" ON rooms
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage rooms" ON rooms
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'owner')
    )
  );

-- RLS Policies for posts
CREATE POLICY "Users can view posts in accessible rooms" ON posts
  FOR SELECT USING (
    room_id IN (
      SELECT r.id FROM rooms r
      JOIN profiles p ON p.organization_id = r.organization_id
      WHERE p.id = auth.uid()
    ) OR room_id IS NULL
  );

CREATE POLICY "Users can create posts" ON posts
  FOR INSERT WITH CHECK (
    (room_id IN (
      SELECT r.id FROM rooms r
      JOIN profiles p ON p.organization_id = r.organization_id
      WHERE p.id = auth.uid()
    ) OR room_id IS NULL) AND author_id = auth.uid()
  );

CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (author_id = auth.uid());

-- RLS Policies for post_replies
CREATE POLICY "Users can view replies to accessible posts" ON post_replies
  FOR SELECT USING (
    post_id IN (
      SELECT p.id FROM posts p
      LEFT JOIN rooms r ON r.id = p.room_id
      LEFT JOIN profiles pr ON pr.organization_id = r.organization_id
      WHERE pr.id = auth.uid() OR p.room_id IS NULL
    )
  );

CREATE POLICY "Users can create replies" ON post_replies
  FOR INSERT WITH CHECK (
    post_id IN (
      SELECT p.id FROM posts p
      LEFT JOIN rooms r ON r.id = p.room_id
      LEFT JOIN profiles pr ON pr.organization_id = r.organization_id
      WHERE pr.id = auth.uid() OR p.room_id IS NULL
    ) AND author_id = auth.uid()
  );

CREATE POLICY "Users can update their own replies" ON post_replies
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Users can delete their own replies" ON post_replies
  FOR DELETE USING (author_id = auth.uid());

-- Function to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_updated_at_boards
  BEFORE UPDATE ON boards
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_updated_at_board_items
  BEFORE UPDATE ON board_items
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Set up Storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('board-attachments', 'board-attachments', false);

-- Storage policies
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND 
    (auth.uid())::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND 
    (auth.uid())::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Board attachments are accessible to organization members" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'board-attachments' AND
    (storage.foldername(name))[1] IN (
      SELECT p.organization_id::text FROM profiles p WHERE p.id = auth.uid()
    )
  );

CREATE POLICY "Users can upload board attachments to their organization" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'board-attachments' AND
    (storage.foldername(name))[1] IN (
      SELECT p.organization_id::text FROM profiles p WHERE p.id = auth.uid()
    )
  );

-- Create a default organization for demo purposes
INSERT INTO organizations (id, name, description) 
VALUES (
  'demo-org-id'::uuid,
  'Demo Boardroom Organization', 
  'Default organization for demo purposes'
);