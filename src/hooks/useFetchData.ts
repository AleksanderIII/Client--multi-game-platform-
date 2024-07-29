import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { AnyAction } from "redux-saga";

interface IFetchDataProps<T> {
  fetchAction: () => AnyAction;
  dataSelector: (state: RootState) => T;
  loadingSelector: (state: RootState) => boolean;
  errorSelector: (state: RootState) => string | null;
}

const useFetchData = <T>({
  fetchAction,
  dataSelector,
  loadingSelector,
  errorSelector,
}: IFetchDataProps<T>) => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(dataSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  return { data, loading, error };
};

export default useFetchData;
