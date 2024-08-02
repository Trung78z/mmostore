// This file serves as a central hub for re-exporting pre-typed Redux hooks.
import { useDispatch, useSelector, useStore } from "react-redux";

export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
export const useAppStore = useStore.withTypes();
