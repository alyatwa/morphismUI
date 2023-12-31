/* export * from './Accordion/Accordion';
export * from './Alert/Alert';

export * from './Breadcrumb';
export * from './Carousel'; */

export * from './Badge';
export * from './Avatar/Avatar';
export * from './Button';
export * from './Checkbox';
export * from './Paper';
export * from './Tooltip';
 export * from './DarkThemeToggle/DarkThemeToggle';
/*export * from './Dropdown';
export * from './FileInput'; */
export * from './Morphism';
export type { CustomTheme } from './Morphism/Theme';
export * from './Spinner/Spinner';
export * from './TextInput';
export * from './HelperText';
export * from './Sidebar/Sidebar';
/* export * from './Footer';
export * from './Label';
export * from './ListGroup/ListGroup';
export * from './Modal';
export * from './Navbar';
export * from './Pagination';
export * from './Progress';
export * from './Radio';
export * from './RangeSlider';
export * from './Rating';
export * from './Select';
export * from './Tab/Tabs';
export * from './Table';
export * from './Textarea';
export * from './Timeline';
export * from './Toast';
export * from './ToggleSwitch';
 */

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;