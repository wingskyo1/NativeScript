<template>
  <Page class="page" actionBarHidden="true">

		<StackLayout orientation="vertical" verticalAlignment="center" >
      <Image id='logo' src='~/images/mikulogo.png' width='50%' />
      <Label id='logoText' textAlignment='center' >Test</Label>

      <TextField width='90%' v-model='form.login'    hint='Login...'  />
			<TextField width='90%' v-model='form.password' hint='Senha' secure='true' />

      <WrapLayout orientation="horizontal" verticalAlignment="center" width='90%' >
        <Switch v-model="keepLogin" />
				<Label text="Keep me logged "></Label>
			</WrapLayout>

      <Button class="btn btn-primary" text="Login" @tap="makeLogin" />
      <Button class="btn btn-primary" text="Register" @tap="register" />

		</StackLayout>

  </Page>
</template>


<script>

import Toaster from 'nativescript-toast';
import { mapGetters, mapMutations } from 'vuex';

export default {
  data () {
    return {
      form:{
        login: 'login',
        password: '123',
      },
      keepLogin: false,
    }
  },
  methods: {
    ...mapGetters([
      'isLogged',
    ]),
    ...mapMutations([
      'login',
    ]),
    register(){
      this.$router.push('register');
    },
    makeLogin(){
      // this.$http.post("cli/auth", this.form ).then((response) => {
      //   if (response.success) {
      //     let data = response;
      //     data.keepLogin = this.keepLogin;
      //     this.login(response);
      //     this.$router.push('home');
      //   } else {
      //     Toaster.makeText('User not found').show();
      //   }
      // });

      this.$router.push('home');
    },
  },
  
}
</script>

<style scoped>
  #logoText {
    font-size: 30px
  }

</style>
