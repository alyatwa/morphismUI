import type {
    DeepPartial,
    /* FlowbiteAccordionTheme,
    FlowbiteAlertTheme,
    FlowbiteAvatarTheme,
    FlowbiteBadgeTheme,
    FlowbiteBreadcrumbTheme,
   
    
    FlowbiteCarouselTheme, */
    PaperTheme,
    ButtonGroupTheme,
    ButtonTheme,
    CheckboxTheme,
    SpinnerTheme,
    /* FlowbiteDarkThemeToggleTheme,
    FlowbiteDropdownTheme,
    FlowbiteFileInputTheme,
    FlowbiteFooterTheme,
    FlowbiteHelperTextTheme,
    FlowbiteLabelTheme,
    FlowbiteListGroupTheme,
    FlowbiteModalTheme,
    FlowbiteNavbarTheme,
    FlowbitePaginationTheme,
    FlowbiteProgressTheme,
    FlowbiteRadioTheme,
    FlowbiteRangeSliderTheme,
    FlowbiteRatingTheme,
    FlowbiteSelectTheme,
    FlowbiteSidebarTheme,
    
    FlowbiteTableTheme,
    FlowbiteTabTheme,
    FlowbiteTextareaTheme,
    FlowbiteTextInputTheme,
    FlowbiteTimelineTheme,
    FlowbiteToastTheme,
    FlowbiteToggleSwitchTheme,
    FlowbiteTooltipTheme, */
  } from '../../components';
  
  export type CustomTheme = DeepPartial<Theme>;
  
  export interface Theme {
   /*  accordion: FlowbiteAccordionTheme;
    alert: FlowbiteAlertTheme;
    avatar: FlowbiteAvatarTheme;
    badge: FlowbiteBadgeTheme;
    breadcrumb: FlowbiteBreadcrumbTheme;
    
    
    carousel: FlowbiteCarouselTheme;
    darkThemeToggle: FlowbiteDarkThemeToggleTheme;
    footer: FlowbiteFooterTheme;
    listGroup: FlowbiteListGroupTheme;
    modal: FlowbiteModalTheme;
    navbar: FlowbiteNavbarTheme;
    rating: FlowbiteRatingTheme;
    pagination: FlowbitePaginationTheme;
    sidebar: FlowbiteSidebarTheme;
    progress: FlowbiteProgressTheme;
    
    tab: FlowbiteTabTheme;
    toast: FlowbiteToastTheme;
    tooltip: FlowbiteTooltipTheme;
    dropdown: FlowbiteDropdownTheme; */
    paper: PaperTheme;
    spinner: SpinnerTheme;
    button: ButtonTheme;
    buttonGroup: ButtonGroupTheme;
    checkbox: CheckboxTheme;
    /* fileInput: FlowbiteFileInputTheme;
    label: FlowbiteLabelTheme;
    radio: FlowbiteRadioTheme;
    rangeSlider: FlowbiteRangeSliderTheme;
    select: FlowbiteSelectTheme;
    textInput: FlowbiteTextInputTheme;
    textarea: FlowbiteTextareaTheme;
    toggleSwitch: FlowbiteToggleSwitchTheme;
    helperText: FlowbiteHelperTextTheme;
    table: FlowbiteTableTheme;
    timeline: FlowbiteTimelineTheme; */
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