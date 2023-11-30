import { useCallback, useState } from "react";

export function useActionDispatcher(initialState) {
  const [state, setState] = useState(initialState);
  const dispatch = useCallback(
    (action, payload) => {
      if(!(action instanceof Function)) {
        return
      }
      const newState = action(payload, state, dispatch);
      if (newState !== undefined) {
        setState(newState);
      }
    },
    [state]
  );
  return [state, dispatch];
}