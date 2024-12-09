import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addAboutUs, addAdvisory, addBlogNews, addCfrp, addHomeImage, addInvestor, addJoinUs, addLetsTalk, addOffering, addPartner, addTeam, editAboutUs, editAdvisory, editBlogNews, editCfrp, editHomeImage, editInvestor, editJoinUs, editLetsTalk, editNavItem, editOffering, editPartner, editTeam } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  patchValue(datas: any) {
    throw new Error('Method not implemented.');
  }
  baseUrl = "https://api.onnes.in/api";

  public dashboard: boolean = false;
  public contactusForm: boolean = false;
  public navItem: boolean = false;
  public homeImage: boolean = false;
  public aboutUs: boolean = false;
  public team: boolean = false;
  public partner: boolean = false;
  public advisory: boolean = false;
  public blogNews: boolean = false;
  public offering: boolean = false;
  public joinus: boolean = false;
  public cfrp : boolean = false;
  public visitor : boolean = false;
  public investor: boolean = false;
  public letsTalk: boolean = false;

  public signOut: boolean = false;
  public currentUser: any = [];
  public httpClientMsg: string = "";

  constructor(
    public http: HttpClient
  ) { }

  openSection(sectionName: string) {
    this.dashboard = false;
    this.contactusForm = false;
    this.navItem = false;
    this.homeImage = false;
    this.aboutUs = false;
    this.team = false;
    this.partner = false;
    this.advisory = false;
    this.blogNews = false;
    this.offering = false;
    this.joinus = false;
    this.cfrp = false;
    this.visitor = false;
    this.investor = false;
    this.letsTalk = false;


    switch (sectionName) {
      case 'dashboard':
        this.dashboard = true;
        break;
      case 'contactusForm':
        this.contactusForm = true;
        break;
      case 'visitor':
        this.visitor = true;
        break;  
      case 'navItem':
        this.navItem = true;
        break;
      case 'homeImage':
        this.homeImage = true;
        break;  
      case 'aboutUs':
        this.aboutUs = true;
        break;
      case 'team':
        this.team = true;
        break;
      case 'advisory':
        this.advisory = true;
        break;  
      case 'partner':
        this.partner = true;
        break; 
      case 'investor':
        this.investor = true;
        break;  
      case 'blogNews':
        this.blogNews = true;
        break;
      case 'offering':
        this.offering = true;
        break;
      case 'cfrp':
        this.cfrp = true;
        break;  
      case 'joinus':
        this.joinus = true;
        break;
      case 'letsTalk':
        this.letsTalk = true;
        break;  
      
    }
  }

  loginDetails(loginForm: any) {
    return this.http.post(`${this.baseUrl}/Login/Login`, loginForm);
  }
  getAdminDetails() {
    return this.http.get(`${this.baseUrl}/Login`);
  }

  getContactUsDetails() {
    return this.http.get(`${this.baseUrl}/Form`);
  }

  // add nav item
  addnavItem(navItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/NavItem`, navItem);
  }

  //get nav item
  getNavItem(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/NavItem`);
  }
  //update navItem
  updateNavItem(navItem: editNavItem): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/NavItem/${navItem.id}`, navItem);
  }
  //delete navItem
  deleteNavItem(Id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/NavItem/${Id}`);
  }

  // addHomeImage
  addHomeImage(addImage: addHomeImage): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/CarouselImage`, addImage);
  }

  //getImage
  getHomeImage(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/CarouselImage`);
  }
  //update homeImage
  updateHomeImage(editImage: editHomeImage): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/CarouselImage/${editImage.id}`, editImage);
  }

  //delete homePage
  deleteHomeImage(Id: any) {
    return this.http.delete(`${this.baseUrl}/CarouselImage/${Id}`);
  }

  // add Aboutus
  addAboutUs(addAbout: addAboutUs): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/AboutUs`, addAbout);
  }
  //get aboutus
  getAboutUs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/AboutUs`);
  }
  //update aboutus
  updateAboutUs(editAbout: editAboutUs): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/AboutUs/${editAbout.id}`, editAbout);
  }
  //delete aboutus
  deleteAboutUs(id: number) {
    return this.http.delete(`${this.baseUrl}/AboutUs/${id}`);
  }

  //add team
  addTeam(team: addTeam): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Team`, team);
  }

  //get team
  getTeam(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Team`);
  }
  //update team
  updateTeam(team: editTeam): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Team/${team.id}`, team);
  }
  //delete team
  deleteTeam(id: number) {
    return this.http.delete(`${this.baseUrl}/Team/${id}`);
  }

  //add blog & news
  addBlogNewsData(blog: addBlogNews): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Blog`, blog);
  }
  //get blog & news
  getBlogNews(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Blog`);
  }
  //update blog & news
  updateBlogNews(blog: editBlogNews): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Blog/${blog.id}`, blog);
  }
  //delete blog & news
  deleteBlogNews(id: number) {
    return this.http.delete(`${this.baseUrl}/Blog/${id}`);
  }

  //add offering
  addOfferingData(offer: addOffering): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Offering`, offer);
  }
  // Get Offering
  getOffering(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Offering`);
  }
  //Put Offering
  updateOffering(offer: editOffering): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Offering/${offer.id}`, offer);
  }
  //Delete Offering
  deleteOffering(Id: any) {
    return this.http.delete(`${this.baseUrl}/Offering/${Id}`);
  }

  //add joinus
  addJoinUs(join: addJoinUs): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/JoinUs`, join);
  }
  //get joinus
  getJoinUs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/JoinUs`);
  }
  //update joinus
  updateJoinUs(join: editJoinUs): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/JoinUs/${join.id}`, join);
  }
  //delete joinus
  deletejoinUs(id: any) {
    return this.http.delete(`${this.baseUrl}/JoinUs/${id}`);
  }

  //add cfrp
  addCfrp(cfrp: addCfrp): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Offoring_CFRP`, cfrp);
  }

  //get cfrp
  getCfrp(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Offoring_CFRP`);
  }
  //update cfrp
  updateCfrp(cfrp: editCfrp): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Offoring_CFRP/${cfrp.id}`, cfrp);
  }

  //delete cfrp
  deleteCfrp(id: any) {
    return this.http.delete(`${this.baseUrl}/Offoring_CFRP/${id}`);
  }

  // add partner
  addPartner(partner: addPartner){
    return this.http.post(`${this.baseUrl}/Partner`,partner);
  }
  // get partner
  getPartner(){
    return this.http.get(`${this.baseUrl}/Partner`);
  }
  // update partner
  updatepartner(partner : editPartner){
    return this.http.put(`${this.baseUrl}/Partner/${partner.id}`,partner);
  }
  //delete partner
  deletePartner(id: number){
    return this.http.delete(`${this.baseUrl}/Partner/${id}`);
  }

  // add Investor
  addInvestor(Investor: addInvestor){
    return this.http.post(`${this.baseUrl}/Investors`,Investor);
  }
  // get Investor
  getInvestor(){
    return this.http.get(`${this.baseUrl}/Investors`);
  }
  // update Investor
  updateInvestor(Investor : editInvestor){
    return this.http.put(`${this.baseUrl}/Investors/${Investor.id}`,Investor);
  }
  //delete Investor
  deleteInvestor(id: number){
    return this.http.delete(`${this.baseUrl}/Investors/${id}`);
  }

  // add advisory
  addAdvisory(advisory : addAdvisory){
    return this.http.post(`${this.baseUrl}/Advisory`,advisory);
  }
  //get advisory
  getAdvisory(){
    return this.http.get(`${this.baseUrl}/advisory`);
  }
  //update advisory
  updateAdvisory(adv: editAdvisory){
    return this.http.put(`${this.baseUrl}/advisory/${adv.id}`,adv);
  }
  //delete advisory
  deleteAdvisory(id: number){
    return this.http.delete(`${this.baseUrl}/advisory/${id}`);
  }

  // add LetsTalk
  addLetsTalk(talk : addLetsTalk){
    return this.http.post(`${this.baseUrl}/Let_sTalk`,talk);
  }
  //get LetsTalk
  getLetsTalk(){
    return this.http.get(`${this.baseUrl}/Let_sTalk`);
  }
  //update LetsTalk
  updateLetsTalk(talk: editLetsTalk){
    return this.http.put(`${this.baseUrl}/Let_sTalk/${talk.id}`,talk);
  }
  //delete LetsTalk
  deleteLetsTalk(id: number){
    return this.http.delete(`${this.baseUrl}/Let_sTalk/${id}`);
  }

  //get visitors data
  getVisitorsData(){
    return this.http.get(`${this.baseUrl}/Visitors`);
  }


}
