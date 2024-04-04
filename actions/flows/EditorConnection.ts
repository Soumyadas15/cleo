'use server'

import { db } from '@/lib/db'

export const onCreateNodesEdges = async (
  flowId: string,
  nodes: string,
  edges: string,
  flowPath: string,
) => {

  const flow = await db.workflow.findUnique({
    where: {
        id: flowId
    }
  })
  if (!flow){
    return { message: "No flow found" }
  }
  const updatedFlow = await db.workflow.update({
    where: {
      id: flowId,
    },
    data: {
      nodes: nodes,
      edges: edges,
      flowPath: flowPath,
    },
  })

  if (updatedFlow) return { message: 'Flow saved' }
}

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  console.log(state)
  const published = await db.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      publish: state,
    },
  })

  if (published.publish) return 'Workflow published'
  return 'Workflow unpublished'
}