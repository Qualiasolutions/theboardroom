export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Enums
export type UserRole = 'member' | 'admin' | 'owner'
export type BoardType = 'strategic' | 'swot' | 'okr' | 'roadmap' | 'brainstorm'
export type ItemType = 
  | 'note' 
  | 'objective' 
  | 'task' 
  | 'milestone' 
  | 'risk' 
  | 'idea' 
  | 'swot-strength' 
  | 'swot-weakness' 
  | 'swot-opportunity' 
  | 'swot-threat' 
  | 'okr-objective' 
  | 'okr-keyresult'
export type ItemColor = 'gold' | 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'cyan' | 'pink'
export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type Status = 'todo' | 'in-progress' | 'completed' | 'blocked'
export type RoomType = 'general' | 'strategic' | 'announcements' | 'private'
export type PostType = 'discussion' | 'announcement' | 'update'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          organization_id: string | null
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          organization_id?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          organization_id?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          description: string | null
          settings: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          settings?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          settings?: Json
          created_at?: string
        }
      }
      boards: {
        Row: {
          id: string
          name: string
          description: string | null
          organization_id: string
          created_by: string
          board_type: BoardType
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          organization_id: string
          created_by: string
          board_type?: BoardType
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          organization_id?: string
          created_by?: string
          board_type?: BoardType
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      board_items: {
        Row: {
          id: string
          board_id: string
          type: ItemType
          title: string
          content: string | null
          position: Json
          color: ItemColor
          priority: Priority
          status: Status
          assignee_id: string | null
          due_date: string | null
          tags: string[]
          metadata: Json
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          board_id: string
          type: ItemType
          title: string
          content?: string | null
          position: Json
          color?: ItemColor
          priority?: Priority
          status?: Status
          assignee_id?: string | null
          due_date?: string | null
          tags?: string[]
          metadata?: Json
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          board_id?: string
          type?: ItemType
          title?: string
          content?: string | null
          position?: Json
          color?: ItemColor
          priority?: Priority
          status?: Status
          assignee_id?: string | null
          due_date?: string | null
          tags?: string[]
          metadata?: Json
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          board_item_id: string
          author_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          board_item_id: string
          author_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          board_item_id?: string
          author_id?: string
          content?: string
          created_at?: string
        }
      }
      rooms: {
        Row: {
          id: string
          organization_id: string
          name: string
          description: string | null
          type: RoomType
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          description?: string | null
          type?: RoomType
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          description?: string | null
          type?: RoomType
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          room_id: string | null
          author_id: string
          title: string
          content: string
          type: PostType
          likes: number
          created_at: string
        }
        Insert: {
          id?: string
          room_id?: string | null
          author_id: string
          title: string
          content: string
          type?: PostType
          likes?: number
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string | null
          author_id?: string
          title?: string
          content?: string
          type?: PostType
          likes?: number
          created_at?: string
        }
      }
      post_replies: {
        Row: {
          id: string
          post_id: string
          author_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          author_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          author_id?: string
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      board_type: BoardType
      item_type: ItemType
      item_color: ItemColor
      priority: Priority
      status: Status
      room_type: RoomType
      post_type: PostType
    }
  }
}