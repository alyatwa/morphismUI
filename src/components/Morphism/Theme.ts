import type {
    DeepPartial,
    /* AccordionTheme,
    AlertTheme,
    
    BadgeTheme,
    BreadcrumbTheme,
    CarouselTheme, */
    AvatarTheme,
    TextInputTheme,
    ButtonGroupTheme,
    ButtonTheme,
    CheckboxTheme,
    SpinnerTheme,
    PaperTheme,
    DarkThemeToggleTheme,
    HelperTextTheme,
    /*  DropdownTheme,
    FileInputTheme,
    FooterTheme,
    LabelTheme,
    ListGroupTheme,
    ModalTheme,
    NavbarTheme,
    PaginationTheme,
    ProgressTheme,
    RadioTheme,
    RangeSliderTheme,
    RatingTheme,
    SelectTheme,
    SidebarTheme,
    TableTheme,
    TabTheme,
    TextareaTheme,
    TimelineTheme,
    ToastTheme,
    ToggleSwitchTheme,
    TooltipTheme, */
  } from '../../components';
  
  export type CustomTheme = DeepPartial<Theme>;
  
  export interface Theme {
   /*  accordion: AccordionTheme;
    alert: AlertTheme;
    
    badge: BadgeTheme;
    breadcrumb: BreadcrumbTheme;
    carousel: CarouselTheme;
    
    footer: FooterTheme;
    listGroup: ListGroupTheme;
    modal: ModalTheme;
    navbar: NavbarTheme;
    rating: RatingTheme;
    pagination: PaginationTheme;
    sidebar: SidebarTheme;
    progress: ProgressTheme;
    
    tab: TabTheme;
    toast: ToastTheme;
    tooltip: TooltipTheme;
    dropdown: DropdownTheme; */
    avatar: AvatarTheme;
    darkThemeToggle: DarkThemeToggleTheme;
    paper: PaperTheme;
    spinner: SpinnerTheme;
    button: ButtonTheme;
    buttonGroup: ButtonGroupTheme;
    checkbox: CheckboxTheme;
    textInput: TextInputTheme;
    helperText: HelperTextTheme;
    /* fileInput: FileInputTheme;
    label: LabelTheme;
    radio: RadioTheme;
    rangeSlider: RangeSliderTheme;
    select: SelectTheme;
    
    textarea: TextareaTheme;
    toggleSwitch: ToggleSwitchTheme;
    
    table: TableTheme;
    timeline: TimelineTheme; */
  }
  
  export interface Boolean {
    off: string;
    on: string;
  }
  
  export interface StateColors {
    info: string;
    failure: string;
    success: string;
    warning: string;
  }
  
  export interface Colors extends StateColors {
    [key: string]: string;
    blue: string;
    cyan: string;
    dark: string;
    gray: string;
    green: string;
    indigo: string;
    light: string;
    lime: string;
    pink: string;
    purple: string;
    red: string;
    teal: string;
    yellow: string;
  }
  
  export interface GradientColors extends Omit<StateColors, 'warning'> {
    [key: string]: string;
    cyan: string;
    lime: string;
    pink: string;
    purple: string;
    teal: string;
  }
  
  export interface GradientDuoToneColors {
    cyanToBlue: string;
    greenToBlue: string;
    pinkToOrange: string;
    purpleToBlue: string;
    purpleToPink: string;
    redToYellow: string;
    tealToLime: string;
  }
  
  export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  export interface Positions {
    'bottom-left': string;
    'bottom-right': string;
    'bottom-center': string;
    'top-left': string;
    'top-center': string;
    'top-right': string;
    'center-left': string;
    center: string;
    'center-right': string;
  }
  
  export interface Sizes {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
  }
  
  export interface ContentPositions {
    center: string;
  }