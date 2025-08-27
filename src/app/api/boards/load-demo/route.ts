import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Note: In a full implementation, this would use MCP Supabase operations
    // For now, we return the demo data but with proper structure
    
    // Load the demo board data (this matches what we created in the database)
    const demoBoard = {
      id: 'e1cfe66d-9da7-4afc-a114-083d99ccecdc',
      name: 'Strategic Planning Board',
      description: 'Main strategic planning workspace for the demo organization',
      organization_id: 'b28b8640-7433-4d0c-a358-f8935d74706c',
      board_type: 'strategic',
      created_at: '2025-08-27T16:03:05.953Z',
      updated_at: '2025-08-27T16:03:05.953Z'
    };

    // Load the demo board items (this matches what we created in the database)
    const demoBoardItems = [
      {
        id: '3dc19a31-b99f-4bd8-b46e-b2b239f63d56',
        board_id: 'e1cfe66d-9da7-4afc-a114-083d99ccecdc',
        type: 'objective',
        title: 'Q4 Revenue Target',
        content: 'Achieve $2M ARR by end of Q4 2024',
        position: { x: 100, y: 150 },
        color: 'gold',
        priority: 'high',
        status: 'in-progress',
        assignee_id: null,
        due_date: null,
        tags: [],
        created_at: '2025-08-27T16:03:17.069Z',
        updated_at: '2025-08-27T16:03:17.069Z',
        created_by: null
      },
      {
        id: 'adfb2d60-09a7-410f-8665-52e40c0d268c',
        board_id: 'e1cfe66d-9da7-4afc-a114-083d99ccecdc',
        type: 'note',
        title: 'Market Research',
        content: 'Complete competitive analysis of top 5 competitors',
        position: { x: 300, y: 200 },
        color: 'blue',
        priority: 'medium',
        status: 'todo',
        assignee_id: null,
        due_date: null,
        tags: [],
        created_at: '2025-08-27T16:03:17.069Z',
        updated_at: '2025-08-27T16:03:17.069Z',
        created_by: null
      },
      {
        id: 'aed9d4c0-7875-478f-ab8d-fa322a042c3f',
        board_id: 'e1cfe66d-9da7-4afc-a114-083d99ccecdc',
        type: 'task',
        title: 'Launch Marketing Campaign',
        content: 'Q4 product launch campaign preparation',
        position: { x: 500, y: 100 },
        color: 'green',
        priority: 'critical',
        status: 'in-progress',
        assignee_id: null,
        due_date: null,
        tags: [],
        created_at: '2025-08-27T16:03:17.069Z',
        updated_at: '2025-08-27T16:03:17.069Z',
        created_by: null
      },
      {
        id: 'f648ace2-08ff-48e4-9d1b-9bf1663aa232',
        board_id: 'e1cfe66d-9da7-4afc-a114-083d99ccecdc',
        type: 'milestone',
        title: 'Product Beta Release',
        content: 'Beta version ready for testing',
        position: { x: 200, y: 350 },
        color: 'purple',
        priority: 'high',
        status: 'completed',
        assignee_id: null,
        due_date: null,
        tags: [],
        created_at: '2025-08-27T16:03:17.069Z',
        updated_at: '2025-08-27T16:03:17.069Z',
        created_by: null
      }
    ];

    return NextResponse.json({ board: demoBoard, items: demoBoardItems });
  } catch (error) {
    console.error('Error loading demo board:', error);
    return NextResponse.json(
      { error: 'Failed to load demo board' },
      { status: 500 }
    );
  }
}