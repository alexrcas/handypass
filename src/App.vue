<template>
  <Panel v-if="authenticated" />


  <template v-if="logIn">
    <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-2"></div>
        <div class="col-lg-6 col-md-8 login-box">
          <div class="col-lg-12 login-key">
            <i class="fa fa-key" aria-hidden="true"></i>
          </div>
          <div class="col-lg-12 login-title">
            HandyPass
          </div>

          <div class="col-lg-12 login-form">
            <div class="col-lg-12 login-form">
                <div class="form-group">
                  <label class="form-control-label">PASSWORD</label>
                  <input type="password" class="form-control ps-1" v-model="passwordInput" autofocus @keyup.enter="submit()">
                </div>

                <div class="col-lg-12 loginbttm d-flex justify-content-end mb-3">
                  <div>
                    <button class="btn btn-outline-primary" @click="login()">LOGIN</button>
                  </div>
                </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-2"></div>
      </div>
    </div>
  </div>
</div>
</template>



<template v-if="signIn">
    <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-2"></div>
        <div class="col-lg-6 col-md-8 login-box">
          <div class="col-lg-12 login-key">
            <i class="fa fa-key" aria-hidden="true"></i>
          </div>
          <div class="col-lg-12 login-title">
            HandyPass
          </div>

          <div class="p-4 text-light">
            <h3>Bienvenido</h3>
            <div class="text-justify mt-4">
              Estás accediendo a HandyPass por primera vez. Debes crear una contraseña segura que utilizarás para acceder 
              a la aplicación.
            </div>

            <div class="text-justify mt-2">
              ¡Ojo! HandyPass no dispone de ningún mecanismo de recuperación de contraseña. Si la olvidas 
              no podrás recuperar la información que hayas almacenado.
            </div>
          </div>

          <div class="col-lg-12 login-form">
            <div class="col-lg-12 login-form">
                <div class="form-group">
                  <label class="form-control-label">PASSWORD</label>
                  <input type="password" class="form-control ps-1" v-model="createPasswordInput" autofocus @keyup.enter="submit()">
                </div>

                <div class="form-group">
                  <label class="form-control-label">CONFIRMAR PASSWORD</label>
                  <input type="password" class="form-control ps-1" v-model="createPasswordConfirmInput" autofocus @keyup.enter="submit()">
                </div>
                

                <div class="col-lg-12 loginbttm d-flex justify-content-end mb-3">
                  <div>
                    <button class="btn btn-outline-primary" :disabled="passwordMissmatch()" @click="signin()">CREAR CUENTA</button>
                  </div>
                </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-2"></div>
      </div>
    </div>
  </div>
</div>
</template>




</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Panel from './components/Panel.vue';

@Options({
  components: {
    Panel
  },
})
export default class App extends Vue {

  signIn: boolean = false;
  logIn: boolean = false;
  authenticated: boolean = false;
  passwordInput: string = '';
  createPasswordInput: string = '';
  createPasswordConfirmInput: string = ''

  async beforeMount() {
    const key: string = await this.loadKey();
    if (key == '') {
      this.signIn = true;
    } else {
      this.logIn = true;
    }
  }

  async loadKey() {
    return await (<any>window).ipcRenderer.invoke('loadKey', {});
  }

  async login() {
    const key = await this.loadKey();
    if (this.passwordInput == key) {
      this.logIn = false;
      this.authenticated = true;
    }
  }

  async signin() {
    const key = this.createPasswordConfirmInput;
    await (<any>window).ipcRenderer.invoke('saveKey', key);
    this.signIn = false;
    this.authenticated = true;
  }

  async submit() {
    await this.login();
  }

  passwordMissmatch() {
    if (this.createPasswordInput == '') {
      return true;
    }

    return this.createPasswordInput != this.createPasswordConfirmInput;
  }

}


</script>


<style scoped>
.content {
    font-family: 'Roboto', sans-serif;
}

.login-box {
    margin-top: 75px;
    height: auto;
    background: #1A2226;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.login-key {
    height: 100px;
    font-size: 80px;
    line-height: 100px;
    background: -webkit-linear-gradient(#27EF9F, #0DB8DE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.login-title {
    margin-top: 15px;
    text-align: center;
    font-size: 30px;
    letter-spacing: 2px;
    margin-top: 15px;
    font-weight: bold;
    color: #ECF0F5;
}

.login-form {
    margin-top: 25px;
    text-align: left;
}

input[type=text] {
    background-color: #1A2226;
    border: none;
    border-bottom: 2px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    margin-bottom: 20px;
    padding-left: 0px;
    color: #ECF0F5;
}

input[type=password] {
    background-color: #1A2226;
    border: none;
    border-bottom: 2px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    padding-left: 0px;
    margin-bottom: 20px;
    color: #ECF0F5;
}

.form-group {
    margin-bottom: 40px;
    outline: 0px;
}

.form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-bottom: 2px solid #0DB8DE;
    outline: 0;
    background-color: #1A2226;
    color: #ECF0F5;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0;
}

label {
    margin-bottom: 0px;
}

.form-control-label {
    font-size: 10px;
    color: #6C6C6C;
    font-weight: bold;
    letter-spacing: 1px;
}

.btn-outline-primary {
    border-color: #0DB8DE;
    color: #0DB8DE;
    border-radius: 0px;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-primary:hover {
    background-color: #0DB8DE;
    right: 0px;
}

.login-btm {
    float: left;
}

.login-button {
    padding-right: 0px;
    text-align: right;
    margin-bottom: 25px;
}

.login-text {
    text-align: left;
    padding-left: 0px;
    color: #A2A4A4;
}

.loginbttm {
    padding: 0px;
}

.text-justify {
  text-align: justify;
}
</style>