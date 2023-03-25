<template>

<nav class="navbar navbar-expand bg-dark text-light py-2">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
      <form class="d-flex w-100" role="search">
        <input class="form-control me-2" type="search" placeholder="Buscar..." v-model="searchText" @keyup="filter()" aria-label="Search">
      </form>
    </div>
  </div>
</nav>


<div class="container-fluid mt-4">

  <template v-if="searchText">
  <div class="card mb-4" v-for="(entry, index) in searchResult">
  <div class="card-header py-0 pt-1 bg-dark d-flex justify-content-between align-items-baseline">
      <h5 class="text-light">{{entry.name}}</h5>
    <i id="editIcon" class="fa-regular fa-pen-to-square text-secondary cursor-pointer text-light"></i>
  </div>

  <div class="card-body">

    <div class="row">

      <div class="col-sm-6 row" v-if="entry.username">
        <label class="col-sm-4 col-form-label col-form-label-sm">Usuario</label>
        <div class="col-sm-8">
          <div class="input-group">
            <input type="email" class="form-control form-control-sm" disabled="true" :value="entry.username">
            <div class="input-group-text">
              <i class="fa-regular fa-clipboard"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 row" v-if="entry.password">
      <label class="col-sm-4 col-form-label col-form-label-sm">Password</label>
      <div class="col-sm-8">
        <div class="input-group">
          <input :type="entry.visible ? 'text' : 'password'" class="form-control form-control-sm" disabled="true" :value="entry.password">
          <div class="input-group-text">
            <i class="fa-regular fa-clipboard"></i>
          </div>
          <div class="input-group-text" :class="entry.visible ? 'active' : ''" @click="toggleVisible(entry)">
            <i class="fa-sharp fa-solid fa-eye"></i>
          </div>
        </div>
      </div>
    </div>

    </div>

    <div class="row mt-3" v-if="entry.observaciones">
      <div>
        <span data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" aria-controls="collapseExample">
          <span class="text-secondary cursor-pointer">
            <i class="fa-solid fa-circle-info me-1"></i>
            Observaciones
          </span>
        </span>
        <div class="collapse mt-2" :id='"collapse" + index'>
          <div class="card card-body text-secondary">
            {{entry.observaciones}}
          </div>
        </div>
      </div>
    </div>

  </div>

</div>
</template>


<template v-if="!searchText">
<div class="card mb-4" v-for="(entry, index) in entries">
  <div class="card-header py-0 pt-1 bg-dark d-flex justify-content-between align-items-baseline">
      <h5 class="text-light">{{entry.name}}</h5>
    <i id="editIcon" class="fa-regular fa-pen-to-square text-secondary cursor-pointer text-light"></i>
  </div>

  <div class="card-body">

    <div class="row">

      <div class="col-sm-6 row" v-if="entry.username">
        <label class="col-sm-4 col-form-label col-form-label-sm">Usuario</label>
        <div class="col-sm-8">
          <div class="input-group">
            <input type="email" class="form-control form-control-sm" disabled="true" :value="entry.username">
            <div class="input-group-text">
              <i class="fa-regular fa-clipboard"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 row" v-if="entry.password">
      <label class="col-sm-4 col-form-label col-form-label-sm">Password</label>
      <div class="col-sm-8">
        <div class="input-group">
          <input :type="entry.visible ? 'text' : 'password'" class="form-control form-control-sm" disabled="true" :value="entry.password">
          <div class="input-group-text">
            <i class="fa-regular fa-clipboard"></i>
          </div>
          <div class="input-group-text" :class="entry.visible ? 'active' : ''" @click="toggleVisible(entry)">
            <i class="fa-sharp fa-solid fa-eye"></i>
          </div>
        </div>
      </div>
    </div>

    </div>

    <div class="row mt-3" v-if="entry.observaciones">
      <div>
        <span data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" aria-controls="collapseExample">
          <span class="text-secondary cursor-pointer">
            <i class="fa-solid fa-circle-info me-1"></i>
            Observaciones
          </span>
        </span>
        <div class="collapse mt-2" :id='"collapse" + index'>
          <div class="card card-body text-secondary">
            {{entry.observaciones}}
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
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Nueva entrada</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
                  <div class="row mb-3">
          <div class="col-sm-12">
            <input type="email" v-model="newEntry.newEntryName" class="form-control form-control-sm required" id="colFormLabelSm" placeholder="Nombre">
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-12">
            <input type="email" v-model="newEntry.newEntryUsername" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Usuario">
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-12">
            <div class="input-group">
              <input type="password" v-model="newEntry.newEntryPassword" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Password">
              <div class="input-group-text">
                <i class="fa-solid fa-dice"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-sm-12">
            <textarea class="form-control form-control-sm" v-model="newEntry.newEntryDetails" id="exampleFormControlTextarea1" rows="4" placeholder="Observaciones"></textarea>
          </div>
        </div>

      </div>

      <div class="mt-1 mb-2 d-flex justify-content-end pe-3">
        <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click=createNewEntry() :disabled="isDisabled()">Aceptar</button>
      </div>
    </div>
  </div>
</div>

</div>




</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class HelloWorld extends Vue {

  newEntry: {
    newEntryName: string,
    newEntryUsername: string,
    newEntryPassword: string,
    newEntryDetails: string,
  } = {
    newEntryName: '',
    newEntryUsername: '',
    newEntryPassword: '',
    newEntryDetails: ''
  } 

  searchText: string = '';

  entries: any[] = [];
  searchResult: any[] = [];


  createNewEntry = () => {
  
    this.entries.push({
        'name': this.newEntry.newEntryName,
        'username': this.newEntry.newEntryUsername,
        'password': this.newEntry.newEntryPassword,
        'observaciones': this.newEntry.newEntryDetails,
        'visible': false
      });

      this.newEntry.newEntryName = '';
      this.newEntry.newEntryUsername = '';
      this.newEntry.newEntryPassword = '';
      this.newEntry.newEntryDetails = '';
  }


  isDisabled = () => {
    if (this.newEntry.newEntryName == '') { return true; }
    return false;
  }


  toggleVisible (entry: any) {
    entry.visible = !entry.visible;
  }


  filter = () => {
    if (this.searchText == '') {
      this.searchResult = [];
      return;
    }

    this.searchResult = this.entries
      .filter(entry => entry.name.toLowerCase().includes(this.searchText));
  }

}
</script>