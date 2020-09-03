import { GlobalState } from "./global-state.interface";
import { createStore } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { reducer } from "./reducer";

export const store = createStore(reducer);
export const useGlobalSelector: TypedUseSelectorHook<GlobalState> = useSelector;
export type GlobalDispatch = typeof store.dispatch;
