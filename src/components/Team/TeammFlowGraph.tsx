import { FC, useMemo, memo, useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";
import dagre from "@dagrejs/dagre";
import { WorkspaceMember } from "@/schema/workspace";

interface TeamFlowGraphProps {
  nodes: Node[];
  edges: Edge[];
}

const Profile: FC<{ data: WorkspaceMember }> = ({ data }) => (
  <div className="flex bg-card text-card-foreground px-5 py-3 rounded-md border">
    <div className="rounded-full w-9 h-9 flex justify-center items-center bg-gray-100">
      <img
        src={data.image || "https://avatars.githubusercontent.com/u/124599?v=4"}
        alt={data.name}
        className="w-8 h-8 rounded-full"
      />
    </div>
    <div className="ml-2">
      <div className="text-sm">{data.name}</div>
      <div className=" text-xs text-muted-foreground">{data.email}</div>
    </div>
  </div>
);

const TeamFlowGraph: FC<TeamFlowGraphProps> = (
  { nodes: _nodes, edges: _edges },
) => {
  const [nodes, setNodes] = useNodesState(_nodes);
  const [edges, setEdges] = useEdgesState(_edges);

  useEffect(()=>{
    setNodes(_nodes);
    setEdges(_edges);
  }, [_nodes, _edges])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={{
        profile: Profile,
      }}
      maxZoom={1.4}
      proOptions={{ hideAttribution: true }}
      fitView
    >
      <Background color="#ccc" variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
};

interface TeamFlowGraphWrapperProps {
  members: WorkspaceMember[];
  teamId: string;
}

export const TeamFlowGraphWrapper: FC<TeamFlowGraphWrapperProps> = memo(({ members, teamId }) => {
  const [nodes, edges]: [Node[], Edge[]] = useMemo(() => {
    const position = { x: 0, y: 0 };
    const edgeType = "smoothstep";

    const nodes = new Array<Node>();
    const edges = new Array<Edge>();

    members.forEach((member) => {
      nodes.push({
        id: member.id,
        type: "profile",
        connectable: false,
        data: { ...member, label: member.name },
        position,
      });
      if (member.manager) {
        edges.push({
          id: `${member.id}-${member.manager}`,
          source: member.id,
          target: member.manager,
          type: edgeType,
          animated: true,
        });
      }
    });

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 300;
    const nodeHeight = 87;

    dagreGraph.setGraph({ rankdir: "TB" });
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source!, edge.target!);
    });

    dagre.layout(dagreGraph);
    nodes.forEach((node) => {
      const n = dagreGraph.node(node.id);
      node.position = { x: n.x, y: n.y };
    });

    return [
      nodes as Node[],
      edges as Edge[],
    ];
  }, [members, teamId]);
  return <TeamFlowGraph nodes={nodes} edges={edges} />;
});
