'use client'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useNodeConnections } from '@/providers/ConnectionProvider'
import toast from 'react-hot-toast'
import { onCreateNodesEdges } from '@/actions/flows/EditorConnection'
import { onFlowPublish } from '@/actions/flows/WorkflowConnections'
import axios from 'axios'

type Props = {
  children: React.ReactNode
  edges: any[]
  nodes: any[]
}

const FlowInstance = ({ children, edges, nodes }: Props) => {
  const pathname = usePathname();
  const [isFlow, setIsFlow] = useState([])
  const { nodeConnection } = useNodeConnections()
  const [isLoading, setIsLoading] = useState(false)
  
  const onFlowAutomation = useCallback(async () => {
    try {
        setIsLoading(true)
      const flowId = pathname?.split('/').pop();
      if (!flowId) {
        throw new Error('Flow ID not found in pathname');
      }
      const url = `/api/workflow`;
      const requestBody = {
        nodes,
        edges,
        isFlow,
        flowId,
      };

      const response = await axios.post(url, JSON.stringify(requestBody), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('Flow saved successfully');
      } else {
        toast.error('Flow save failed:');
      }
    } catch (error : any) {
        // Handle errors
        const errorMessage = (error.response && error.response.data && error.response.data.error) || "An error occurred";
        toast.error(errorMessage);
    } finally {
        setIsLoading(false);
    }
        
  }, [pathname, nodes, edges, isFlow, nodeConnection]);





  
  const onPublishWorkflow = useCallback(async () => {
    const response = await onFlowPublish(pathname?.split('/').pop()!, true)
    if (response) toast.success(response)
  }, [])

  const onAutomateFlow = async () => {
    const flows: any = []
    const connectedEdges = edges.map((edge) => edge.target)
    connectedEdges.map((target) => {
      nodes.map((node) => {
        if (node.id === target) {
          flows.push(node.type)
        }
      })
    })

    setIsFlow(flows)
  }

  useEffect(() => {
    onAutomateFlow()
  }, [edges])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 p-4">
        <Button
          onClick={onFlowAutomation}
          disabled={isFlow.length < 1 || isLoading}
        >
          Save
        </Button>
        <Button
          disabled={isFlow.length < 1}
          onClick={onPublishWorkflow}
        >
          Publish
        </Button>
      </div>
      {children}
    </div>
  )
}

export default FlowInstance