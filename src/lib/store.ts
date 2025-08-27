import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Post {
  id: string;
  title: string;
  content: string;
  type: 'discussion' | 'announcement' | 'update';
  room?: string;
  author: string;
  createdAt: string;
  likes: number;
  replies: Reply[];
}

export interface Reply {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface BoardItem {
  id: string;
  type: 'note' | 'roadmap' | 'objective' | 'metric' | 'swot-strength' | 'swot-weakness' | 'swot-opportunity' | 'swot-threat' | 'okr-objective' | 'okr-keyresult' | 'risk' | 'idea' | 'task' | 'milestone';
  title: string;
  content: string;
  position: { x: number; y: number };
  color: 'gold' | 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'cyan' | 'pink';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'todo' | 'in-progress' | 'completed' | 'blocked';
  assignee?: string;
  dueDate?: string;
  tags?: string[];
  comments?: Comment[];
  connections?: string[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Board {
  id: string;
  name: string;
  items: BoardItem[];
  createdAt: string;
  updatedAt: string;
}

interface AppStore {
  // Posts
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'replies'>) => void;
  addReply: (postId: string, content: string) => void;
  likePost: (postId: string) => void;
  
  // Boards
  boards: Board[];
  currentBoard: Board | null;
  addBoard: (name: string) => void;
  updateBoard: (boardId: string, items: BoardItem[]) => void;
  loadBoard: (boardId: string) => void;
  deleteBoard: (boardId: string) => void;
  setCurrentBoard: (board: Board | null) => void;
  
  // Board Items
  addBoardItem: (item: BoardItem) => void;
  updateBoardItem: (itemId: string, updates: Partial<BoardItem>) => void;
  deleteBoardItem: (itemId: string) => void;
  
  // Notifications
  notifications: string[];
  addNotification: (message: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Posts state
      posts: [],
      
      addPost: (postData) => {
        const newPost: Post = {
          ...postData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          likes: 0,
          replies: []
        };
        set((state) => ({ 
          posts: [newPost, ...state.posts],
          notifications: [...state.notifications, `New post created: ${newPost.title}`]
        }));
      },
      
      addReply: (postId, content) => {
        const reply: Reply = {
          id: Date.now().toString(),
          content,
          author: 'Abdelrahman',
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          posts: state.posts.map(post =>
            post.id === postId
              ? { ...post, replies: [...post.replies, reply] }
              : post
          )
        }));
      },
      
      likePost: (postId) => {
        set((state) => ({
          posts: state.posts.map(post =>
            post.id === postId
              ? { ...post, likes: post.likes + 1 }
              : post
          )
        }));
      },
      
      // Boards state
      boards: [],
      currentBoard: null,
      
      addBoard: (name) => {
        const newBoard: Board = {
          id: Date.now().toString(),
          name,
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({ 
          boards: [...state.boards, newBoard],
          currentBoard: newBoard,
          notifications: [...state.notifications, `Board created: ${name}`]
        }));
      },
      
      updateBoard: (boardId, items) => {
        set((state) => ({
          boards: state.boards.map(board =>
            board.id === boardId
              ? { ...board, items, updatedAt: new Date().toISOString() }
              : board
          ),
          currentBoard: state.currentBoard?.id === boardId
            ? { ...state.currentBoard, items, updatedAt: new Date().toISOString() }
            : state.currentBoard
        }));
      },
      
      loadBoard: (boardId) => {
        const board = get().boards.find(b => b.id === boardId);
        if (board) {
          set({ currentBoard: board });
        }
      },
      
      deleteBoard: (boardId) => {
        set((state) => ({
          boards: state.boards.filter(board => board.id !== boardId),
          currentBoard: state.currentBoard?.id === boardId ? null : state.currentBoard
        }));
      },
      
      setCurrentBoard: (board) => {
        set({ currentBoard: board });
      },
      
      // Board Items
      addBoardItem: (item) => {
        const { currentBoard } = get();
        if (currentBoard) {
          const updatedItems = [...currentBoard.items, item];
          get().updateBoard(currentBoard.id, updatedItems);
        }
      },
      
      updateBoardItem: (itemId, updates) => {
        const { currentBoard } = get();
        if (currentBoard) {
          const updatedItems = currentBoard.items.map(item =>
            item.id === itemId ? { ...item, ...updates } : item
          );
          get().updateBoard(currentBoard.id, updatedItems);
        }
      },
      
      deleteBoardItem: (itemId) => {
        const { currentBoard } = get();
        if (currentBoard) {
          const updatedItems = currentBoard.items.filter(item => item.id !== itemId);
          get().updateBoard(currentBoard.id, updatedItems);
        }
      },
      
      // Notifications  
      notifications: [],
      
      addNotification: (message) => {
        // Use the toast system instead of storing notifications
        if (typeof window !== 'undefined') {
          import('@/lib/use-toast').then(({ toast }) => {
            toast({
              title: message,
              variant: "info",
              duration: 3000,
            });
          });
        }
      },
      
      clearNotifications: () => {
        set({ notifications: [] });
      }
    }),
    {
      name: 'boardroom-storage',
      partialize: (state) => ({
        posts: state.posts,
        boards: state.boards,
        currentBoard: state.currentBoard
      })
    }
  )
);