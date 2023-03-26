<template>


<nav class="navbar navbar-expand bg-primary text-light py-1">
  <div class="container-fluid">
    <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
      <ul class="navbar-nav me-4 mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Menú
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">Nueva entrada</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex w-75" role="search">
        <input class="form-control form-control-sm me-2" type="search" placeholder="Buscar..." v-model="searchText" @keyup="filter()" aria-label="Search">
      </form>
    </div>
  </div>
</nav>


<div class="container-fluid mt-4">

  <template v-if="searchText">
  <div class="card mb-4" v-for="(entry, index) in searchResult">
  <div class="card-header py-0 pt-1 bg-secondary d-flex justify-content-between align-items-baseline">
      <h5 class="text-light">{{entry.getName()}}</h5>
    <i id="editIcon" class="fa-regular fa-pen-to-square text-secondary cursor-pointer text-light"></i>
  </div>

  <div class="card-body">

    <div class="row">

      <div class="col-sm-6 row" v-if="entry.getUsername()">
        <label class="col-sm-4 col-form-label col-form-label-sm">Usuario</label>
        <div class="col-sm-8">
          <div class="input-group">
            <input type="email" class="form-control form-control-sm" disabled="true" :value="entry.getUsername()">
            <div class="input-group-text">
              <i class="fa-regular fa-clipboard"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 row" v-if="entry.getPassword()">
      <label class="col-sm-4 col-form-label col-form-label-sm">Password</label>
      <div class="col-sm-8">
        <div class="input-group">
          <input :type="entry.getVisible() ? 'text' : 'password'" class="form-control form-control-sm" disabled="true" :value="entry.getPassword()">
          <div class="input-group-text">
            <i class="fa-regular fa-clipboard"></i>
          </div>
          <div class="input-group-text" :class="entry.getVisible() ? 'active' : ''" @click="toggleVisible(entry)">
            <i class="fa-sharp fa-solid fa-eye"></i>
          </div>
        </div>
      </div>
    </div>

    </div>

    <div class="row mt-3" v-if="entry.getObservaciones()">
      <div>
        <span data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" aria-controls="collapseExample">
          <span class="cursor-pointer">
            <i class="fa-solid fa-circle-info me-1"></i>
            Observaciones
          </span>
        </span>
        <div class="collapse mt-2" :id='"collapse" + index'>
          <div class="card card-body">
            {{entry.getObservaciones()}}
          </div>
        </div>
      </div>
    </div>

  </div>

</div>
</template>


<template v-if="!searchText">
<div class="card mb-4" v-for="(entry, index) in entries" v-if="renderComponent">
  <div class="card-header py-0 pt-1 bg-secondary d-flex justify-content-between align-items-baseline">
      <h5 class="text-light">{{entry.getName()}}</h5>
    <i id="editIcon" data-bs-toggle="modal" data-bs-target="#editModal" @click="fillData(entry.getUuid())" class="fa-regular fa-pen-to-square text-secondary cursor-pointer text-light"></i>
  </div>

  <div class="card-body">

    <div class="row">

      <div class="col-sm-6 row" v-if="entry.getUsername()">
        <label class="col-sm-4 col-form-label col-form-label-sm">Usuario</label>
        <div class="col-sm-8">
          <div class="input-group">
            <input type="email" class="form-control form-control-sm" disabled="true" :value="entry.getUsername()">
            <div class="input-group-text">
              <i class="fa-regular fa-clipboard"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 row" v-if="entry.getPassword()">
      <label class="col-sm-4 col-form-label col-form-label-sm">Password</label>
      <div class="col-sm-8">
        <div class="input-group">
          <input :type="entry.getVisible() ? 'text' : 'password'" class="form-control form-control-sm" disabled="true" :value="entry.getPassword()">
          <div class="input-group-text">
            <i class="fa-regular fa-clipboard"></i>
          </div>
          <div class="input-group-text" :class="entry.getVisible() ? 'active' : ''" @click="toggleVisible(entry)">
            <i class="fa-sharp fa-solid fa-eye"></i>
          </div>
        </div>
      </div>
    </div>

    </div>

    <div class="row mt-3" v-if="entry.getObservaciones()">
      <div>
        <span data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" aria-controls="collapseExample">
          <span class="cursor-pointer">
            <i class="fa-solid fa-circle-info me-1"></i>
            Observaciones
          </span>
        </span>
        <div class="collapse mt-2" :id='"collapse" + index'>
          <div class="card card-body">
            {{entry.getObservaciones()}}
          </div>
        </div>
      </div>
    </div>

  </div>

</div>

</template>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header py-2 bg-secondary text-light d-flex justify-content-center">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Nueva entrada</h1>
      </div>
      <div class="modal-body">
        
                  <div class="row mb-3">
          <div class="col-sm-12">
            <input type="email" v-model="newEntryCommand.name" class="form-control form-control-sm required" id="colFormLabelSm" placeholder="Nombre">
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-12">
            <input type="email" v-model="newEntryCommand.username" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Usuario">
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-12">
            <div class="input-group">
              <input :type="newEntryCommand.visible? 'text' : 'password'" v-model="newEntryCommand.password" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Password">
              <div class="input-group-text" @click="randomPassword()">
                <i class="fa-solid fa-dice"></i>
              </div>
              <div class="input-group-text" :class="newEntryCommand.visible? 'active' : '' " @click="toggleNewEntryVisible()">
            <i class="fa-sharp fa-solid fa-eye"></i>
          </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-sm-12">
            <textarea class="form-control form-control-sm" v-model="newEntryCommand.observaciones" id="exampleFormControlTextarea1" rows="4" placeholder="Observaciones"></textarea>
          </div>
        </div>

      </div>

      <div class="mb-2 d-flex justify-content-end pe-3">
        <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal" @click="closeNewEntry()">Cancelar</button>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click=createNewEntry() :disabled="isDisabled()">Aceptar</button>
      </div>
    </div>
  </div>
</div>





<!-- Modal Editar -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header py-2 bg-secondary text-light d-flex justify-content-center">
        <h1 class="modal-title fs-5" id="editModal">Editar entrada</h1>
      </div>
      <div class="modal-body">
        
                  <div class="row mb-3">
          <div class="col-sm-12">
            <input type="email" v-model="editEntry.editEntryName" class="form-control form-control-sm required" id="colFormLabelSm" placeholder="Nombre">
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-12">
            <input type="email" v-model="editEntry.editEntryUsername" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Usuario">
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-12">
            <div class="input-group">
              <input :type="editEntry.editEntrypasswordVisible? 'text' : 'password'" v-model="editEntry.editEntryPassword" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Password">
              <div class="input-group-text" @click="editRandomPassword()">
                <i class="fa-solid fa-dice"></i>
              </div>
              <div class="input-group-text" :class="editEntry.editEntrypasswordVisible? 'active' : '' " @click="toggleEditEntryVisible()">
            <i class="fa-sharp fa-solid fa-eye"></i>
          </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-sm-12">
            <textarea v-model="editEntry.editEntryDetails" class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="4" placeholder="Observaciones"></textarea>
          </div>
        </div>

      </div>

      <div class="d-flex">
        <div class="w-100">
          <button type="button" class="btn btn-danger ms-3" data-bs-dismiss="modal" @click="deleteEntry()">Eliminar</button>
        </div>
        <div class="mb-2 d-flex justify-content-end pe-3">
        <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="update()" :disabled="isDisabledEdit()">Aceptar</button>
        </div>
      </div>



    </div>
  </div>
</div>





</div>


</template>

<script lang="ts">
import Entry from '@/model/Entry';
import { Options, Vue } from 'vue-class-component';
import Popper from 'vue3-popper';
import PasswordGenerator from '../PasswordGenerator';
import { nextTick } from 'vue';
import NewEntryCommand from '@/model/NewEntryCommand';

@Options({
  components: {
    Popper,
    PasswordGenerator
  },
})
export default class HelloWorld extends Vue {

  renderComponent: boolean = true;

  newEntryCommand: NewEntryCommand = new NewEntryCommand('', '', '', '', false);

  editEntry: {
    editEntryName: string,
    editEntryUsername: string,
    editEntryPassword: string,
    editEntryDetails: string,
    editEntryUuid: number,
    editEntrypasswordVisible: boolean
  } = {
    editEntryName: '',
    editEntryUsername: '',
    editEntryPassword: '',
    editEntryDetails: '',
    editEntryUuid: -1,
    editEntrypasswordVisible: false
  } 


  searchText: string = '';

  entries: Entry[] = [];
  searchResult: Entry[] = [];


  createNewEntry = () => {
  
    this.entries.push(
      new Entry(this.newEntryCommand.name, this.newEntryCommand.username, this.newEntryCommand.password,
      this.newEntryCommand.observaciones, this.newEntryCommand.visible)
    );

    this.newEntryCommand = new NewEntryCommand('', '', '', '', false);
  }


  isDisabled = (): boolean => {
    if (this.newEntryCommand.name == '') { return true; }
    return false;
  }



  isDisabledEdit = (): boolean => {
    if (this.editEntry.editEntryName == '') { return true; }
    return false;
  }


  async toggleVisible(entry: Entry) {

    entry.toggleVisible();
    this.renderComponent = false;
    await nextTick();
    this.renderComponent = true;
  }

  async toggleNewEntryVisible () {
    this.renderComponent = false;
    await nextTick();
    this.newEntryCommand.toggleVisible();
    this.renderComponent = true;
  }

  toggleEditEntryVisible () {
    this.editEntry.editEntrypasswordVisible = !this.editEntry.editEntrypasswordVisible;
  }


  filter = () => {
    if (this.searchText == '') {
      this.searchResult = [];
      return;
    }

    this.searchResult = this.entries
      .filter(entry => entry.getName().toLowerCase().includes(this.searchText));
  }

  fillData(uuid: number) {
    const entry = this.entries
      .filter(entry => entry.getUuid() === uuid)[0];

    this.editEntry.editEntryUuid = entry.getUuid();
    this.editEntry.editEntryName = entry.getName();
    this.editEntry.editEntryUsername = entry.getUsername();
    this.editEntry.editEntryPassword = entry.getPassword();
    this.editEntry.editEntryDetails = entry.getObservaciones();
  }

  async update() {
    const entry = this.entries
      .filter(entry => entry.getUuid() === this.editEntry.editEntryUuid)[0];

      entry.setName(this.editEntry.editEntryName)
      entry.setUsername(this.editEntry.editEntryUsername)
      entry.setPassword(this.editEntry.editEntryPassword)
      entry.setObservaciones(this.editEntry.editEntryDetails)

      this.renderComponent = false;
      await nextTick();
      this.renderComponent = true;
  }

  deleteEntry() {
    this.entries = this.entries
      .filter(entry => entry.getUuid() != this.editEntry.editEntryUuid);   
  }

  randomPassword() {
    this.newEntryCommand.password = PasswordGenerator.newPassword();
  }

  editRandomPassword() {
    this.editEntry.editEntryPassword = PasswordGenerator.newPassword();
  }

  closeNewEntry() {
    this.newEntryCommand = new NewEntryCommand('', '', '', '', false);
  }

}
</script>