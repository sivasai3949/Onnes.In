export interface Contact_us {
    id : number
    name : string
    mailID : string
    yourMessage	: string
    date: Date
  }
export interface editNavItem{
  id : number
  navbarName : string
  navbarSubName : string
  routerLink : string
}
export interface addNavItem{
  navbarName : string
  navbarSubName : string
  routerLink : string
}
export interface editHomeImage{
  id : number
  text : string
  imageFile : string
  order : number
  colour : string
}
export interface addHomeImage{
  text : string
  imageFile : string
  order : number
  colour : string
}
export interface editAboutUs{
  id : number
  imageFile : string
  content : string
}
export interface addAboutUs{
  imageFile : string
  content : string
}

export interface editTeam{
  id : number
  name : string
  imageFile : string
  designation : string
  about : string
  link1: string
  link2: string
  link3: string
  link4: string
}

export interface addTeam{
  name : string
  imageFile : string
  designation : string
  about : string
  link1: string
  link2: string
  link3: string
  link4: string
}

export interface editBlogNews{
  id : number
  imageFile : string
  content : string
  link : string
}
export interface addBlogNews{
  imageFile : string
  content : string
  link : string
}

export interface editOffering{
  id : number
  title : string
  imageFile : string
  content : string
}

export interface addOffering{
  title : string
  imageFile : string
  content : string
}

export interface editJoinUs{
  id : number
  content : string
  mail : string
}

export interface addJoinUs{
  content : string
  mail : string
}
export interface editCfrp{
  id : number
  name: string
  content : string
}
export interface addCfrp{
  name: string
  content : string
}

export interface editPartner{
  id: number
  title: string
  imageFile : string
  link: string
}
export interface addPartner{
  title: string
  imageFile : string
  link: string
}
export interface editInvestor{
  id: number
  title: string
  imageFile : string
  link: string
}
export interface addInvestor{
  title: string
  imageFile : string
  link: string
}

export interface editAdvisory{
  id : number
  name : string
  imageFile : string
  designation : string
  about : string
  link : string
}

export interface addAdvisory{
  name : string
  imageFile : string
  designation : string
  about : string
  link : string
}

export interface editLetsTalk{
  id: number
  name: string
  adress: string
}
export interface addLetsTalk{
  name: string
  adress: string
}