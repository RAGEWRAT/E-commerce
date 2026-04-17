import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector(store => store.fetchStatus);
  const dispatch = useDispatch();
   
  useEffect(()=> {
      if(fetchStatus.fetchDone) return;
  
      const controller = new AbortController();
      const signal = controller.signal;

      
      dispatch(fetchStatusActions.markFetchingStarted());
  
      fetch('/api/items', {signal})
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(({ items }) => {
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(itemsActions.addInitialItems(items[0]));
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        dispatch(fetchStatusActions.markFetchingFinished());
      });
  
      return () => {
        controller.abort();
      };
    }, [fetchStatus]);

  return (
  <>
    
  </>
  );
}

export default FetchItems;