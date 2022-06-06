import { createContext, PropsWithChildren, useContext, useEffect, useReducer } from 'react';

type NavBarState = {
  isRoot?: boolean;
}

type Dispatch = (action: Action) => void;

const NavBarStateContext = createContext<NavBarState | undefined>(undefined);
const NavBarDispatchContext = createContext<Dispatch | undefined>(undefined);

type Action = {
  isRoot: boolean;
}

function navBarReducer(state: NavBarState, action: Action): NavBarState {
  return {
    isRoot: action.isRoot,
  };
  
}

function NavBarProvider({ children }: PropsWithChildren<any>) {
  const [state, dispatch] = useReducer(navBarReducer, {});
  return (
    <NavBarStateContext.Provider value={state}>
      <NavBarDispatchContext.Provider value={dispatch}>{children}</NavBarDispatchContext.Provider>
    </NavBarStateContext.Provider>
  );
}

function useNavBarState() {
  const context = useContext(NavBarStateContext);
  if (context === undefined) {
    throw new Error('useNavBarState must be used within a NavBarProvider');
  }
  return context;
}

function useNavBarDispatch() {
  const context = useContext(NavBarDispatchContext);
  if (context === undefined) {
    throw new Error('useNavBarDispatch must be used within a NavBarProvider');
  }
  return context;
}

export { NavBarProvider, useNavBarState, useNavBarDispatch };