"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore, BoardItem } from "@/lib/store";
import { 
  Plus, Edit3, Save, X, Target, Calendar, TrendingUp, 
  Download, Upload, Share2, Grid3X3, FileText, Lightbulb,
  MessageSquare, UserCheck, Clock, Search, MoreHorizontal,
  Zap, AlertTriangle, CheckCircle, Star, Link2, Layout,
  Wifi, WifiOff, Eye
} from "lucide-react";


// interface BoardComment {
//   id: string;
//   board_item_id: string;
//   user_id: string;
//   content: string;
//   created_at: string;
//   user?: {
//     full_name: string;
//     avatar_url?: string;
//   };
// }

interface ActiveUser {
  user_id: string;
  board_id: string;
  full_name: string;
  avatar_url?: string;
  last_seen: string;
  cursor_x?: number;
  cursor_y?: number;
}

interface BoardTemplate {
  id: string;
  name: string;
  description: string;
  items: Omit<BoardItem, 'id' | 'board_id' | 'assignee_id' | 'created_at' | 'updated_at' | 'created_by' | 'connections'>[];
}

const templates: BoardTemplate[] = [
  {
    id: 'swot',
    name: 'SWOT Analysis',
    description: 'Strengths, Weaknesses, Opportunities, Threats analysis framework',
    items: [
      { type: 'swot-strength', title: 'Strengths', content: 'Internal positive factors...', position: { x: 50, y: 50 }, color: 'green', tags: ['swot'] },
      { type: 'swot-weakness', title: 'Weaknesses', content: 'Internal negative factors...', position: { x: 350, y: 50 }, color: 'red', tags: ['swot'] },
      { type: 'swot-opportunity', title: 'Opportunities', content: 'External positive factors...', position: { x: 50, y: 200 }, color: 'blue', tags: ['swot'] },
      { type: 'swot-threat', title: 'Threats', content: 'External negative factors...', position: { x: 350, y: 200 }, color: 'orange', tags: ['swot'] }
    ]
  },
  {
    id: 'okr',
    name: 'OKRs Framework',
    description: 'Objectives and Key Results planning template',
    items: [
      { type: 'okr-objective', title: 'Objective 1', content: 'Clear, ambitious objective...', position: { x: 100, y: 50 }, color: 'purple', tags: ['okr'] },
      { type: 'okr-keyresult', title: 'Key Result 1.1', content: 'Measurable outcome...', position: { x: 100, y: 150 }, color: 'blue', tags: ['okr', 'kr'] },
      { type: 'okr-keyresult', title: 'Key Result 1.2', content: 'Measurable outcome...', position: { x: 100, y: 220 }, color: 'blue', tags: ['okr', 'kr'] },
      { type: 'okr-objective', title: 'Objective 2', content: 'Clear, ambitious objective...', position: { x: 400, y: 50 }, color: 'purple', tags: ['okr'] }
    ]
  },
  {
    id: 'roadmap',
    name: 'Product Roadmap',
    description: 'Strategic product development timeline',
    items: [
      { type: 'milestone', title: 'Q1 Milestone', content: 'Key deliverable...', position: { x: 50, y: 100 }, color: 'gold', tags: ['q1'] },
      { type: 'milestone', title: 'Q2 Milestone', content: 'Key deliverable...', position: { x: 200, y: 100 }, color: 'blue', tags: ['q2'] },
      { type: 'milestone', title: 'Q3 Milestone', content: 'Key deliverable...', position: { x: 350, y: 100 }, color: 'green', tags: ['q3'] },
      { type: 'milestone', title: 'Q4 Milestone', content: 'Key deliverable...', position: { x: 500, y: 100 }, color: 'purple', tags: ['q4'] }
    ]
  }
];

export default function EnhancedBoardroomPage() {
  const { 
    currentBoard, 
    boards, 
    addBoard, 
    updateBoard, 
    setCurrentBoard,
    addBoardItem,
    updateBoardItem,
    deleteBoardItem,
    addNotification 
  } = useAppStore();
  
  const [items, setItems] = useState<BoardItem[]>([]);
  const [localItems, setLocalItems] = useState<BoardItem[]>([]);
  const [activeUsers] = useState<ActiveUser[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>('all');
  const [currentBoardName, setCurrentBoardName] = useState('New Board');
  const [isEditingBoardName, setIsEditingBoardName] = useState(false);
  const [activeTab, setActiveTab] = useState('board');
  const [draggedItem, setDraggedItem] = useState<BoardItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load board items from database using MCP
  useEffect(() => {
    const loadBoardItems = async () => {
      if (!currentBoard?.id) {
        // Load default demo board
        try {
          const response = await fetch('/api/boards/load-demo');
          if (response.ok) {
            const { board, items: boardItems } = await response.json();
            setItems(boardItems);
            setCurrentBoardName(board.name);
          }
        } catch (error) {
          console.error('Failed to load demo board:', error);
          setItems([]);
        }
      } else {
        // Load items from the current board (when proper board system is implemented)
        const boardItems = currentBoard.items || [];
        setItems(boardItems);
      }
    };

    loadBoardItems();
  }, [currentBoard]);

  // Sync local items with state
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  // Initialize board if none exists
  useEffect(() => {
    if (!currentBoard && boards.length === 0) {
      addBoard('New Board');
    } else if (!currentBoard && boards.length > 0) {
      setCurrentBoard(boards[0]);
    }
  }, [currentBoard, boards.length, addBoard, setCurrentBoard, boards]);
  
  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addNotification('Back online - syncing changes');
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      addNotification('Working offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [addNotification]);

  const addItem = async (type: BoardItem['type'], template?: boolean) => {
    const position = template ? { x: 0, y: 0 } : { x: Math.random() * 400, y: Math.random() * 300 };
    
    const newItemData = {
      board_id: 'e1cfe66d-9da7-4afc-a114-083d99ccecdc', // Using demo board ID
      type,
      title: getDefaultTitle(type),
      content: getDefaultContent(type),
      position: position,
      color: getTypeColor(type),
      priority: 'medium' as const,
      status: 'todo' as const,
      tags: []
    };
    
    try {
      const response = await fetch('/api/boards/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemData),
      });

      if (response.ok) {
        const { item } = await response.json();
        const updatedItems = [...items, item];
        setItems(updatedItems);
        addNotification(`Added new ${type} to board`);
      } else {
        throw new Error('Failed to create item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      addNotification('Failed to add item');
    }
  };

  const loadTemplate = async (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template || !currentBoard?.id) return;

    try {
      // Create all template items
      const newItems: BoardItem[] = [];
      for (const [index, item] of template.items.entries()) {
        const newItem = {
          id: `template-item-${Date.now()}-${index}`,
          board_id: currentBoard.id,
          type: item.type,
          title: item.title,
          content: item.content,
          position: item.position,
          color: item.color,
          priority: 'medium' as const,
          status: 'todo' as const,
          assignee_id: 'user-1', // Mock user ID for now
          tags: item.tags || [],
          connections: []
        };
        
        newItems.push(newItem);
        addBoardItem(newItem);
      }
      
      // Update local state
      const updatedItems = [...items, ...newItems];
      setItems(updatedItems);
      
      setCurrentBoardName(template.name);
      addNotification(`Template "${template.name}" loaded successfully`);
    } catch (error) {
      console.error('Error loading template:', error);
      addNotification('Failed to load template');
    }
  };

  const getDefaultTitle = (type: BoardItem['type']) => {
    const titles = {
      'note': 'Strategic Note',
      'roadmap': 'Roadmap Item',
      'objective': 'Key Objective',
      'metric': 'Success Metric',
      'swot-strength': 'Strength',
      'swot-weakness': 'Weakness',
      'swot-opportunity': 'Opportunity',
      'swot-threat': 'Threat',
      'okr-objective': 'Objective',
      'okr-keyresult': 'Key Result',
      'risk': 'Risk Factor',
      'idea': 'Strategic Idea',
      'task': 'Action Item',
      'milestone': 'Milestone'
    };
    return titles[type];
  };

  const getDefaultContent = (type: BoardItem['type']) => {
    const content = {
      'note': 'Add your strategic insights here...',
      'roadmap': 'Define milestone and timeline...',
      'objective': 'Set clear, measurable objective...',
      'metric': 'Define success criteria...',
      'swot-strength': 'Internal positive factors...',
      'swot-weakness': 'Internal areas for improvement...',
      'swot-opportunity': 'External positive possibilities...',
      'swot-threat': 'External challenges or risks...',
      'okr-objective': 'Clear, ambitious, qualitative goal...',
      'okr-keyresult': 'Specific, measurable outcome...',
      'risk': 'Potential challenge or threat...',
      'idea': 'Innovative strategic concept...',
      'task': 'Specific action to be completed...',
      'milestone': 'Key deliverable or achievement...'
    };
    return content[type];
  };

  const getTypeColor = (type: BoardItem['type']): BoardItem['color'] => {
    const colors = {
      'note': 'gold' as const,
      'roadmap': 'blue' as const,
      'objective': 'green' as const,
      'metric': 'purple' as const,
      'swot-strength': 'green' as const,
      'swot-weakness': 'red' as const,
      'swot-opportunity': 'blue' as const,
      'swot-threat': 'orange' as const,
      'okr-objective': 'purple' as const,
      'okr-keyresult': 'blue' as const,
      'risk': 'red' as const,
      'idea': 'cyan' as const,
      'task': 'orange' as const,
      'milestone': 'pink' as const
    };
    return colors[type];
  };

  const getColorClasses = (color: BoardItem['color']) => {
    const classes = {
      'gold': 'bg-gold/10 border-gold/30 text-foreground',
      'blue': 'bg-blue-500/10 border-blue-500/30 text-foreground',
      'green': 'bg-green-500/10 border-green-500/30 text-foreground',
      'purple': 'bg-purple-500/10 border-purple-500/30 text-foreground',
      'red': 'bg-red-500/10 border-red-500/30 text-foreground',
      'orange': 'bg-orange-500/10 border-orange-500/30 text-foreground',
      'cyan': 'bg-cyan-500/10 border-cyan-500/30 text-foreground',
      'pink': 'bg-pink-500/10 border-pink-500/30 text-foreground'
    };
    return classes[color];
  };

  const getTypeIcon = (type: BoardItem['type']) => {
    const icons = {
      'note': <Edit3 className="h-4 w-4" />,
      'roadmap': <Calendar className="h-4 w-4" />,
      'objective': <Target className="h-4 w-4" />,
      'metric': <TrendingUp className="h-4 w-4" />,
      'swot-strength': <CheckCircle className="h-4 w-4" />,
      'swot-weakness': <AlertTriangle className="h-4 w-4" />,
      'swot-opportunity': <Lightbulb className="h-4 w-4" />,
      'swot-threat': <Zap className="h-4 w-4" />,
      'okr-objective': <Target className="h-4 w-4" />,
      'okr-keyresult': <Star className="h-4 w-4" />,
      'risk': <AlertTriangle className="h-4 w-4" />,
      'idea': <Lightbulb className="h-4 w-4" />,
      'task': <CheckCircle className="h-4 w-4" />,
      'milestone': <Star className="h-4 w-4" />
    };
    return icons[type];
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-gold';
      case 'low': return 'text-green-500';
      default: return 'text-mid';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'in-progress': return <Clock className="h-3 w-3 text-blue-500" />;
      case 'blocked': return <AlertTriangle className="h-3 w-3 text-red-500" />;
      default: return <div className="h-3 w-3 border border-mid rounded-full" />;
    }
  };

  const startEditing = (item: BoardItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    
    try {
      const response = await fetch(`/api/boards/items/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (response.ok) {
        // Update in local state
        const updatedItems = items.map(item => 
          item.id === editingId 
            ? { ...item, title: editTitle, content: editContent }
            : item
        );
        setItems(updatedItems);
        
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
        addNotification('Item updated');
      } else {
        throw new Error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      addNotification('Failed to update item');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/boards/items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update in local state
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        
        addNotification('Item deleted');
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      addNotification('Failed to delete item');
    }
  };
  
  const handleShareBoard = () => {
    const shareUrl = `${window.location.origin}/boardroom?board=${currentBoard?.id}`;
    navigator.clipboard.writeText(shareUrl);
    addNotification('Board link copied to clipboard!');
  };
  
  const handleDragStart = (e: React.DragEvent, item: BoardItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    try {
      const response = await fetch(`/api/boards/items/${draggedItem.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position: { x, y } }),
      });

      if (response.ok) {
        // Update in local state
        const updatedItems = items.map(item => 
          item.id === draggedItem.id 
            ? { ...item, position: { x, y } }
            : item
        );
        setItems(updatedItems);
      } else {
        throw new Error('Failed to update position');
      }
    } catch (error) {
      console.error('Error updating item position:', error);
      addNotification('Failed to update item position');
    }
    
    setDraggedItem(null);
  };

  const updateItemStatus = async (id: string, status: BoardItem['status']) => {
    try {
      const response = await fetch(`/api/boards/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Update in local state
        const updatedItems = items.map(item => 
          item.id === id ? { ...item, status } : item
        );
        setItems(updatedItems);
        
        addNotification(`Status updated to ${status}`);
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      addNotification('Failed to update status');
    }
  };

  const updateItemPriority = async (id: string, priority: BoardItem['priority']) => {
    try {
      const response = await fetch(`/api/boards/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priority }),
      });

      if (response.ok) {
        // Update in local state
        const updatedItems = items.map(item => 
          item.id === id ? { ...item, priority } : item
        );
        setItems(updatedItems);
        
        addNotification(`Priority updated to ${priority}`);
      } else {
        throw new Error('Failed to update priority');
      }
    } catch (error) {
      console.error('Error updating priority:', error);
      addNotification('Failed to update priority');
    }
  };

  const exportBoard = () => {
    const boardData = {
      name: currentBoardName,
      items: items,
      exported: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(boardData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentBoardName.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification(`Board exported: ${currentBoardName}.json`);
  };

  const importBoard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const boardData = JSON.parse(e.target?.result as string);
        setItems(boardData.items || []);
        setCurrentBoardName(boardData.name || 'Imported Board');
        if (currentBoard) {
          updateBoard(currentBoard.id, boardData.items || []);
        }
        addNotification(`Board imported successfully`);
      } catch (error) {
        console.error('Error importing board:', error);
        addNotification(`Error importing board`);
      }
    };
    reader.readAsText(file);
    if (event.target) {
      event.target.value = '';
    }
  };

  const filteredItems = localItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center">
              <Layout className="h-6 w-6 text-gold" />
            </div>
            <div>
              {isEditingBoardName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={currentBoardName}
                    onChange={(e) => setCurrentBoardName(e.target.value)}
                    className="text-2xl font-bold h-auto border-none p-0 bg-transparent focus:bg-panel/20 px-2 py-1"
                    onBlur={() => setIsEditingBoardName(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingBoardName(false)}
                    autoFocus
                  />
                  <Button size="sm" variant="ghost" onClick={() => setIsEditingBoardName(false)}>
                    <Save className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <h1 
                  className="text-3xl font-bold bg-gradient-to-r from-foreground to-gold bg-clip-text text-transparent cursor-pointer hover:from-gold hover:to-gold-soft transition-all duration-300 group flex items-center gap-2"
                  onClick={() => setIsEditingBoardName(true)}
                >
                  {currentBoardName}
                  <Edit3 className="h-4 w-4 text-mid group-hover:text-gold transition-colors opacity-0 group-hover:opacity-100" />
                </h1>
              )}
              <p className="text-mid/80 font-medium">Strategic Planning Workspace • {items.length} items</p>
            </div>
          </div>
        </div>
        
        {/* Connection Status & Active Users */}
        <div className="flex items-center gap-3 mr-4">
          <div className={`flex items-center gap-2 px-3 py-1 glass text-xs ${
            isOnline 
              ? 'text-green-400 border-green-500/20' 
              : 'text-orange-400 border-orange-500/20'
          }`}>
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isOnline ? 'Online' : 'Offline'}
          </div>
          
          {/* Active Users */}
          {activeUsers.length > 0 && (
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3 text-mid" />
              <div className="flex -space-x-2">
                {activeUsers.slice(0, 3).map((activeUser) => (
                  <div 
                    key={activeUser.user_id}
                    className="w-6 h-6 bg-gradient-to-br from-gold/20 to-gold/10 border border-gold/30 flex items-center justify-center text-xs font-medium text-gold"
                    title={activeUser.full_name}
                  >
                    {activeUser.full_name[0]?.toUpperCase()}
                  </div>
                ))}
                {activeUsers.length > 3 && (
                  <div className="w-6 h-6 bg-panel border border-border/30 flex items-center justify-center text-xs text-mid">
                    +{activeUsers.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Premium Board Actions */}
        <div className="flex gap-3">
          <Button 
            onClick={exportBoard} 
            variant="outline" 
            size="sm"
            className="glass hover-lift border-gold/20 hover:border-gold/40 hover:bg-gold/10 transition-all duration-300 group"
          >
            <Download className="h-4 w-4 mr-2 group-hover:text-gold transition-colors" />
            Export
          </Button>
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            variant="outline" 
            size="sm"
            className="glass hover-lift border-gold/20 hover:border-gold/40 hover:bg-gold/10 transition-all duration-300 group"
          >
            <Upload className="h-4 w-4 mr-2 group-hover:text-gold transition-colors" />
            Import
          </Button>
          <Button 
            onClick={handleShareBoard} 
            size="sm"
            className="bg-gradient-to-r from-gold to-gold-soft hover:from-gold-soft hover:to-gold text-background hover-lift shadow-premium transition-all duration-300"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Board
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importBoard}
        className="hidden"
      />

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-panel/50 glass border border-border/20 p-1">
          <TabsTrigger value="board">Strategic Board</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="saved">Saved Boards</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
        </TabsList>

        {/* Strategic Board Tab */}
        <TabsContent value="board" className="space-y-4">
          {/* Premium Controls */}
          <div className="glass p-4 mb-6">
            <div className="flex justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                {/* Enhanced Search */}
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mid group-focus-within:text-gold transition-colors" />
                  <Input
                    placeholder="Search strategic items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-72 bg-panel/50 border-border/30 focus:border-gold/50 transition-all duration-300 hover:bg-panel/70"
                  />
                </div>

                {/* Premium Filter */}
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-panel/80 border border-border/30 px-4 py-2 text-sm hover:bg-panel focus:border-gold/50 transition-all duration-300 min-w-36"
                >
                  <option value="all">All Types</option>
                  <option value="note">Notes</option>
                  <option value="objective">Objectives</option>
                  <option value="roadmap">Roadmap</option>
                  <option value="metric">Metrics</option>
                  <option value="risk">Risks</option>
                  <option value="idea">Ideas</option>
                  <option value="task">Tasks</option>
                </select>
              </div>

              {/* Premium Add Item Palette */}
              <div className="flex gap-2">
                <Button 
                  onClick={() => addItem('note')} 
                  variant="outline" 
                  size="sm"
                  className="hover-lift border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 group transition-all duration-300"
                >
                  <Edit3 className="h-4 w-4 mr-2 group-hover:text-blue-400 transition-colors" />
                  Note
                </Button>
                <Button 
                  onClick={() => addItem('objective')} 
                  variant="outline" 
                  size="sm"
                  className="hover-lift border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10 group transition-all duration-300"
                >
                  <Target className="h-4 w-4 mr-2 group-hover:text-green-400 transition-colors" />
                  Objective
                </Button>
                <Button 
                  onClick={() => addItem('task')} 
                  variant="outline" 
                  size="sm"
                  className="hover-lift border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/10 group transition-all duration-300"
                >
                  <CheckCircle className="h-4 w-4 mr-2 group-hover:text-orange-400 transition-colors" />
                  Task
                </Button>
                <Button 
                  onClick={() => addItem('idea')} 
                  variant="outline" 
                  size="sm"
                  className="hover-lift border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 group transition-all duration-300"
                >
                  <Lightbulb className="h-4 w-4 mr-2 group-hover:text-purple-400 transition-colors" />
                  Idea
                </Button>
              </div>
            </div>
          </div>

          {/* Premium Board Canvas */}
          <Card className="glass shadow-premium-lg min-h-[700px] relative overflow-hidden group">
            <CardContent className="p-6 h-full">
              {filteredItems.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <Grid3X3 className="h-16 w-16 mx-auto mb-6 text-mid opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">
                      {items.length === 0 ? 'Empty Strategic Board' : 'No items match your search'}
                    </h3>
                    <p className="text-mid mb-6">
                      {items.length === 0 
                        ? 'Add strategic items or load a template to start planning'
                        : 'Try adjusting your search or filter criteria'
                      }
                    </p>
                    {items.length === 0 && (
                      <div className="flex gap-2 justify-center">
                        <Button onClick={() => addItem('note')} className="bg-gold hover:bg-gold-soft text-background">
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Item
                        </Button>
                        <Button onClick={() => setActiveTab('templates')} variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Use Template
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div 
                  className="relative w-full h-full"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {filteredItems.map((item) => (
                    <Card 
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className={`absolute w-80 ${getColorClasses(item.color)} cursor-move hover:shadow-premium transition-all duration-300 hover:scale-105 hover-lift group/item`}
                      style={{ 
                        left: item.position.x, 
                        top: item.position.y 
                      }}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            {getTypeIcon(item.type)}
                            {editingId === item.id ? (
                              <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="h-6 text-sm font-medium bg-transparent border-none p-0 focus:ring-0"
                              />
                            ) : (
                              <CardTitle className="text-sm flex-1">{item.title}</CardTitle>
                            )}
                          </div>
                          
                          {/* Item Actions */}
                          <div className="flex gap-1">
                            {editingId === item.id ? (
                              <>
                                <Button size="sm" variant="ghost" onClick={saveEdit}>
                                  <Save className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={cancelEdit}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button size="sm" variant="ghost" onClick={() => startEditing(item)}>
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => deleteItem(item.id)}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Status and Priority Row */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <button onClick={() => {
                              const statuses: BoardItem['status'][] = ['todo', 'in-progress', 'completed', 'blocked'];
                              const currentIndex = statuses.indexOf(item.status || 'todo');
                              const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                              updateItemStatus(item.id, nextStatus);
                            }}>
                              {getStatusIcon(item.status)}
                            </button>
                            <span className={getPriorityColor(item.priority)}>
                              {item.priority?.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-mid">
                            <UserCheck className="h-3 w-3" />
                            <span>{item.assignee}</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        {editingId === item.id ? (
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full h-20 text-sm bg-transparent border border-border p-2 resize-none focus:ring-1 focus:ring-gold"
                            placeholder="Enter content..."
                          />
                        ) : (
                          <p className="text-sm text-mid whitespace-pre-wrap mb-3">{item.content}</p>
                        )}

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex gap-1 mb-2">
                            {item.tags.map((tag) => (
                              <span key={tag} className="text-xs px-2 py-1 bg-background text-mid">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Comments Count */}
                        <div className="flex items-center justify-between text-xs text-mid">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-3 w-3" />
                            <span>{item.comments?.length || 0} comments</span>
                          </div>
                          
                          {item.connections && item.connections.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Link2 className="h-3 w-3" />
                              <span>{item.connections.length}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="bg-panel border-border hover:border-gold transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gold" />
                    {template.name}
                  </CardTitle>
                  <p className="text-sm text-mid">{template.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-xs text-mid">
                      {template.items.length} items included
                    </div>
                    <Button 
                      onClick={() => loadTemplate(template.id)}
                      className="w-full bg-gold hover:bg-gold-soft text-background"
                    >
                      Load Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Saved Boards Tab */}
        <TabsContent value="saved" className="space-y-4">
          <div className="space-y-3">
            <Button 
              onClick={() => addBoard(`Board ${boards.length + 1}`)}
              className="w-full bg-gold hover:bg-gold-soft text-background mb-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Board
            </Button>
            {boards.map((board) => (
              <Card key={board.id} className="bg-panel border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{board.name}</h3>
                      <p className="text-sm text-mid">Last modified: {new Date(board.updatedAt).toLocaleDateString()}</p>
                      <p className="text-xs text-mid">{board.items.length} items</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setCurrentBoard(board);
                          setActiveTab('board');
                          addNotification(`Loaded board: ${board.name}`);
                        }}
                      >
                        {currentBoard?.id === board.id ? 'Current' : 'Load'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Collaboration Tab */}
        <TabsContent value="collaboration" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-panel border-border">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-background">A</span>
                    </div>
                    <div>
                      <div className="font-medium">Abdelrahman</div>
                      <div className="text-xs text-mid">Owner</div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Members
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-panel border-border">
              <CardHeader>
                <CardTitle>Activity Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <div>Objective completed</div>
                      <div className="text-xs text-mid">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Edit3 className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <div>Strategic note updated</div>
                      <div className="text-xs text-mid">4 hours ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Enhanced Legend */}
      <Card className="bg-panel border-border">
        <CardHeader>
          <CardTitle className="text-sm">Board Legend & Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
            <div className="space-y-2">
              <div className="font-medium">Item Types</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gold rounded"></div>
                  <span>Notes ({items.filter(i => i.type === 'note').length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Objectives ({items.filter(i => i.type === 'objective').length})</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium">Status</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span>Completed ({items.filter(i => i.status === 'completed').length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-blue-500" />
                  <span>In Progress ({items.filter(i => i.status === 'in-progress').length})</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Priority</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Critical ({items.filter(i => i.priority === 'critical').length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>High ({items.filter(i => i.priority === 'high').length})</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Quick Stats</div>
              <div className="space-y-1">
                <div className="text-mid">Total Items: {items.length}</div>
                <div className="text-mid">Completion: {items.length > 0 ? Math.round((items.filter(i => i.status === 'completed').length / items.length) * 100) : 0}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}