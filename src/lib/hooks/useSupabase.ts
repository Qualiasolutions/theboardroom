'use client'

import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/types/database.types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useSupabase = () => {
  const supabase = createClient()
  const queryClient = useQueryClient()
  const router = useRouter()

  // Auth hooks
  const useUser = () => {
    return useQuery({
      queryKey: ['user'],
      queryFn: async () => {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        return user
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    })
  }

  const useProfile = (userId?: string) => {
    return useQuery({
      queryKey: ['profile', userId],
      queryFn: async () => {
        if (!userId) return null
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()
        if (error) throw error
        return data
      },
      enabled: !!userId,
    })
  }

  const useSignOut = () => {
    return useMutation({
      mutationFn: async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      },
      onSuccess: () => {
        queryClient.clear()
        router.push('/')
      },
    })
  }

  // Board hooks
  const useBoards = (organizationId?: string) => {
    return useQuery({
      queryKey: ['boards', organizationId],
      queryFn: async () => {
        if (!organizationId) return []
        const { data, error } = await supabase
          .from('boards')
          .select('*')
          .eq('organization_id', organizationId)
          .order('updated_at', { ascending: false })
        if (error) throw error
        return data
      },
      enabled: !!organizationId,
    })
  }

  const useBoard = (boardId?: string) => {
    return useQuery({
      queryKey: ['board', boardId],
      queryFn: async () => {
        if (!boardId) return null
        const { data, error } = await supabase
          .from('boards')
          .select('*')
          .eq('id', boardId)
          .single()
        if (error) throw error
        return data
      },
      enabled: !!boardId,
    })
  }

  const useBoardItems = (boardId?: string) => {
    return useQuery({
      queryKey: ['board_items', boardId],
      queryFn: async () => {
        if (!boardId) return []
        const { data, error } = await supabase
          .from('board_items')
          .select('*')
          .eq('board_id', boardId)
          .order('created_at', { ascending: true })
        if (error) throw error
        return data
      },
      enabled: !!boardId,
    })
  }

  const useCreateBoard = () => {
    return useMutation({
      mutationFn: async ({ name, organizationId, boardType = 'strategic' }: {
        name: string
        organizationId: string
        boardType?: Database['public']['Enums']['board_type']
      }) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const { data, error } = await supabase
          .from('boards')
          .insert({
            name,
            organization_id: organizationId,
            created_by: user.id,
            board_type: boardType,
          })
          .select()
          .single()
        if (error) throw error
        return data
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['boards'] })
        queryClient.setQueryData(['board', data.id], data)
      },
    })
  }

  const useUpdateBoard = () => {
    return useMutation({
      mutationFn: async ({ boardId, updates }: {
        boardId: string
        updates: Partial<Database['public']['Tables']['boards']['Update']>
      }) => {
        const { data, error } = await supabase
          .from('boards')
          .update(updates)
          .eq('id', boardId)
          .select()
          .single()
        if (error) throw error
        return data
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['boards'] })
        queryClient.setQueryData(['board', data.id], data)
      },
    })
  }

  const useDeleteBoard = () => {
    return useMutation({
      mutationFn: async (boardId: string) => {
        const { error } = await supabase
          .from('boards')
          .delete()
          .eq('id', boardId)
        if (error) throw error
        return boardId
      },
      onSuccess: (boardId) => {
        queryClient.invalidateQueries({ queryKey: ['boards'] })
        queryClient.removeQueries({ queryKey: ['board', boardId] })
        queryClient.removeQueries({ queryKey: ['board_items', boardId] })
      },
    })
  }

  // Board Items hooks
  const useCreateBoardItem = () => {
    return useMutation({
      mutationFn: async (item: Database['public']['Tables']['board_items']['Insert']) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const { data, error } = await supabase
          .from('board_items')
          .insert({ ...item, created_by: user.id })
          .select()
          .single()
        if (error) throw error
        return data
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['board_items', data.board_id] })
      },
    })
  }

  const useUpdateBoardItem = () => {
    return useMutation({
      mutationFn: async ({ itemId, updates }: {
        itemId: string
        updates: Partial<Database['public']['Tables']['board_items']['Update']>
      }) => {
        const { data, error } = await supabase
          .from('board_items')
          .update(updates)
          .eq('id', itemId)
          .select()
          .single()
        if (error) throw error
        return data
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['board_items', data.board_id] })
      },
    })
  }

  const useDeleteBoardItem = () => {
    return useMutation({
      mutationFn: async (itemId: string) => {
        const { error } = await supabase
          .from('board_items')
          .delete()
          .eq('id', itemId)
        if (error) throw error
        return itemId
      },
      onSuccess: (_, itemId) => {
        queryClient.invalidateQueries({ queryKey: ['board_items'] })
      },
    })
  }

  // Posts hooks
  const usePosts = (roomId?: string) => {
    return useQuery({
      queryKey: ['posts', roomId],
      queryFn: async () => {
        let query = supabase
          .from('posts')
          .select(`
            *,
            post_replies(*)
          `)
          .order('created_at', { ascending: false })

        if (roomId) {
          query = query.eq('room_id', roomId)
        }

        const { data, error } = await query
        if (error) throw error
        return data
      },
    })
  }

  const useCreatePost = () => {
    return useMutation({
      mutationFn: async (post: Database['public']['Tables']['posts']['Insert']) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const { data, error } = await supabase
          .from('posts')
          .insert({ ...post, author_id: user.id })
          .select()
          .single()
        if (error) throw error
        return data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] })
      },
    })
  }

  return {
    supabase,
    // Auth
    useUser,
    useProfile,
    useSignOut,
    // Boards
    useBoards,
    useBoard,
    useBoardItems,
    useCreateBoard,
    useUpdateBoard,
    useDeleteBoard,
    // Board Items
    useCreateBoardItem,
    useUpdateBoardItem,
    useDeleteBoardItem,
    // Posts
    usePosts,
    useCreatePost,
  }
}