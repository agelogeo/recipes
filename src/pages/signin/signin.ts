import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {NgForm} from "@angular/forms";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public authService: AuthService,private loadingCtrl: LoadingController,private alertCtrl: AlertController) {
  }

  onSignin(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authService.signin(form.value.email,form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error =>{
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Failed',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      })
  }
}
