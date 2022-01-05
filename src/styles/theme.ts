
//https://convertacolor.com/

const common = {
    
  colors: {
    primary: "#ff792a"
  }
  ,media: {
      sm: 600, 
      md: 960, 
      lg: 1440, 
      // 0 ≥ screen < 600px  | sm | mobile
      // 600px ≥ screen < 960px  | md | tablet
      //   960px ≥ screen < 1440px | lg | wide tablet/small desktop
      //  1440px ≥ screen          | xl | wide desktop
  }
}

export const themes =  {
  light: {
    ...common,
    
    name: "light",

    colors: {
      ...common.colors,
      textDefault: 'hsl(240, 2%, 0%)',  
      textHint: 'hsl(240, 2%, 18%)',   // 18% down
      textDisabled: 'hsl(240, 2%, 50%)',       // 32% down
    },
  },  
}