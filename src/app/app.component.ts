import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/tabs/tabs";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import firebase from 'firebase';
import {AuthService} from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController,private authService:AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyB5uG11zi8hOZ98oSbiGe5xO-3Mjsl5Mis",
      authDomain: "ionic2-recipes-37d19.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.isAuthenticated = true;
        this.nav.setRoot(this.tabsPage);
      }else{
        this.isAuthenticated = false;
        this.nav.setRoot(this.signinPage);
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(){
    this.authService.logout();
    this.menuCtrl.close();
  }
}

