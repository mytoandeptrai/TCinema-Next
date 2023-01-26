import useClickOutSide from 'hooks/useClickOutSide';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react';

interface IDropdownContext {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  toggleHandler: () => void;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

interface IDropdownProviderProps {
  placeholder?: string;
  children: ReactNode;
}

const DropdownContext = createContext<IDropdownContext>({} as IDropdownContext);
const DropdownProvider = ({ children, placeholder = '', ...props }: IDropdownProviderProps) => {
  const dropdownRef = useRef(null);
  const [title, setTitle] = useState(placeholder);
  const [show, setShow] = useState(false);

  const toggleHandler = useCallback(() => {
    setShow((isShow) => !isShow);
  }, [setShow]);

  const values = useMemo(
    () => ({ show, setShow, toggleHandler, title, setTitle }),
    [show, toggleHandler, title]
  );

  useClickOutSide(dropdownRef, () => setShow(false));
  return (
    <DropdownContext.Provider value={values} {...props}>
      <div ref={dropdownRef}>{children}</div>
    </DropdownContext.Provider>
  );
};

function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === 'undefined')
    throw new Error('useDropdown must be used within DropdownProvider');
  return context;
}

export { useDropdown, DropdownProvider };
