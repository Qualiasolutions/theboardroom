"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit3, Save, X, Target, Calendar, Users, TrendingUp } from "lucide-react";

interface BoardItem {
  id: string;
  type: 'note' | 'roadmap' | 'objective' | 'metric';
  title: string;
  content: string;
  position: { x: number; y: number };
  color: 'gold' | 'blue' | 'green' | 'purple';
}

export default function BoardroomPage() {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const addItem = (type: BoardItem['type']) => {
    const newItem: BoardItem = {
      id: Date.now().toString(),
      type,
      title: getDefaultTitle(type),
      content: getDefaultContent(type),
      position: { x: Math.random() * 400, y: Math.random() * 300 },
      color: getTypeColor(type)
    };
    setItems([...items, newItem]);
  };

  const getDefaultTitle = (type: BoardItem['type']) => {
    switch (type) {
      case 'note': return 'Strategic Note';
      case 'roadmap': return 'Roadmap Item';
      case 'objective': return 'Key Objective';
      case 'metric': return 'Success Metric';
    }
  };

  const getDefaultContent = (type: BoardItem['type']) => {
    switch (type) {
      case 'note': return 'Add your strategic insights here...';
      case 'roadmap': return 'Define milestone and timeline...';
      case 'objective': return 'Set clear, measurable objective...';
      case 'metric': return 'Define success criteria...';
    }
  };

  const getTypeColor = (type: BoardItem['type']) => {
    switch (type) {
      case 'note': return 'gold' as const;
      case 'roadmap': return 'blue' as const;
      case 'objective': return 'green' as const;
      case 'metric': return 'purple' as const;
    }
  };

  const getColorClasses = (color: BoardItem['color']) => {
    switch (color) {
      case 'gold': return 'bg-gold/10 border-gold/30 text-foreground';
      case 'blue': return 'bg-blue-500/10 border-blue-500/30 text-foreground';
      case 'green': return 'bg-green-500/10 border-green-500/30 text-foreground';
      case 'purple': return 'bg-purple-500/10 border-purple-500/30 text-foreground';
    }
  };

  const getTypeIcon = (type: BoardItem['type']) => {
    switch (type) {
      case 'note': return <Edit3 className="h-4 w-4" />;
      case 'roadmap': return <Calendar className="h-4 w-4" />;
      case 'objective': return <Target className="h-4 w-4" />;
      case 'metric': return <TrendingUp className="h-4 w-4" />;
    }
  };

  const startEditing = (item: BoardItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
  };

  const saveEdit = () => {
    setItems(items.map(item => 
      item.id === editingId 
        ? { ...item, title: editTitle, content: editContent }
        : item
    ));
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Strategic Boardroom</h1>
          <p className="text-mid mt-1">Professional board for roadmaps, objectives, and strategic planning</p>
        </div>
        
        {/* Add Item Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={() => addItem('note')} 
            variant="outline" 
            size="sm"
            className="border-gold/30 hover:bg-gold/10"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Note
          </Button>
          <Button 
            onClick={() => addItem('roadmap')} 
            variant="outline" 
            size="sm"
            className="border-blue-500/30 hover:bg-blue-500/10"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Roadmap
          </Button>
          <Button 
            onClick={() => addItem('objective')} 
            variant="outline" 
            size="sm"
            className="border-green-500/30 hover:bg-green-500/10"
          >
            <Target className="h-4 w-4 mr-2" />
            Objective
          </Button>
          <Button 
            onClick={() => addItem('metric')} 
            variant="outline" 
            size="sm"
            className="border-purple-500/30 hover:bg-purple-500/10"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Metric
          </Button>
        </div>
      </div>

      {/* Board Area */}
      <Card className="bg-panel border-border min-h-[600px] relative overflow-hidden">
        <CardContent className="p-6 h-full">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <Users className="h-16 w-16 mx-auto mb-6 text-mid opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Empty Boardroom</h3>
                <p className="text-mid mb-6">Add notes, roadmaps, objectives, and metrics to start planning</p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    onClick={() => addItem('note')} 
                    className="bg-gold hover:bg-gold-soft text-background"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Item
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {items.map((item) => (
                <Card 
                  key={item.id}
                  className={`absolute w-64 ${getColorClasses(item.color)} cursor-move hover:shadow-lg transition-shadow`}
                  style={{ 
                    left: item.position.x, 
                    top: item.position.y 
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        {editingId === item.id ? (
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="h-6 text-sm font-medium bg-transparent border-none p-0 focus:ring-0"
                          />
                        ) : (
                          <CardTitle className="text-sm">{item.title}</CardTitle>
                        )}
                      </div>
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
                      <p className="text-sm text-mid whitespace-pre-wrap">{item.content}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="bg-panel border-border">
        <CardHeader>
          <CardTitle className="text-sm">Board Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gold rounded"></div>
              <span>Strategic Notes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Roadmap Items</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Key Objectives</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Success Metrics</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}