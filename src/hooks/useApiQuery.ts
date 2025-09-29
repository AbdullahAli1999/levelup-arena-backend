import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseApiQueryOptions<T> {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseApiQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useApiQuery<T>(
  queryFn: () => Promise<T>,
  options: UseApiQueryOptions<T> = {}
): UseApiQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const { enabled = true, onSuccess, onError } = options;

  const executeQuery = async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);
      const result = await queryFn();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      onError?.(error);
      
      // Show error toast
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeQuery();
  }, [enabled]);

  return {
    data,
    loading,
    error,
    refetch: executeQuery,
  };
}

interface UseApiMutationOptions<T, V> {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: Error, variables: V) => void;
}

interface UseApiMutationResult<T, V> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  mutate: (variables: V) => Promise<T>;
  reset: () => void;
}

export function useApiMutation<T, V>(
  mutationFn: (variables: V) => Promise<T>,
  options: UseApiMutationOptions<T, V> = {}
): UseApiMutationResult<T, V> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const { onSuccess, onError } = options;

  const mutate = async (variables: V): Promise<T> => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(variables);
      setData(result);
      onSuccess?.(result, variables);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      onError?.(error, variables);
      
      // Show error toast
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  return {
    data,
    loading,
    error,
    mutate,
    reset,
  };
}