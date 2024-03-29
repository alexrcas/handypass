<template v-if="renderComponent">
  <nav class="navbar navbar-expand text-light py-1">
    <div class="container-fluid">
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
        <ul class="navbar-nav me-4 mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Menú
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">Nueva
                  entrada</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex w-75" role="search">
          <input class="form-control form-control-sm me-2 search-input" type="search" placeholder="Buscar..." v-model="searchText"
            @keyup="filter()" aria-label="Search">
        </form>
      </div>
    </div>
  </nav>


  <div class="container-fluid mt-4">

    <template v-if="!searchText" v-for="entry in entries">
      <template v-if="renderComponent">
        <Entry :entry="entry" @onDeleteEntry="deleteEntry" @onUpdateEntry="update" @onRefresh="refresh"/>
      </template>
    </template>

    <template v-if="searchText" v-for="entry in searchResult">
      <template v-if="renderComponent">
        <Entry :entry="entry" @onDeleteEntry="deleteEntry" @onUpdateEntry="update" />
      </template>
    </template>

  </div>


  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content dark-bg">
        <div class="modal-header py-2 bg-secondary text-light d-flex justify-content-center">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Nueva entrada</h1>
        </div>
        <div class="modal-body">

          <div class="row mb-3">
            <div class="col-sm-12">
              <input type="email" v-model="newEntryCommand.name" class="form-control form-control-sm required"
                id="colFormLabelSm" placeholder="Nombre">
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-12">
              <input type="email" v-model="newEntryCommand.username" class="form-control form-control-sm"
                id="colFormLabelSm" placeholder="Usuario">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-12">
              <div class="input-group">
                <input :type="newPasswordVisible ? 'text' : 'password'" v-model="newEntryCommand.password"
                  class="form-control form-control-sm" id="colFormLabelSm" placeholder="Password">
                <div class="input-group-text" @click="randomPassword()">
                  <i class="fa-solid fa-dice"></i>
                </div>
                <div class="input-group-text" :class="newPasswordVisible ? 'active' : ''"
                  @click="toggleNewEntryVisible()">
                  <i class="fa-sharp fa-solid fa-eye"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <textarea class="form-control form-control-sm" v-model="newEntryCommand.observaciones"
                id="exampleFormControlTextarea1" rows="4" placeholder="Observaciones"></textarea>
            </div>
          </div>

        </div>

        <div class="mb-2 d-flex justify-content-end pe-3">
          <button type="button" class="btn btn-outline-secondary me-2" data-bs-dismiss="modal"
            @click="closeNewEntry()">Cancelar</button>
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" @click=createNewEntry()
            :disabled="isDisabled()">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EntryType from '@/model/EntryType';
import { Options, Vue } from 'vue-class-component';
import Popper from 'vue3-popper';
import PasswordGenerator from '../PasswordGenerator';
import { nextTick } from 'vue';
import NewEntryCommand from '@/model/NewEntryCommand';
import Entry from './Entry.vue';
import EditEntryCommand from '@/model/EditEntryCommand';
import { BrowserWindow, ipcRenderer } from 'electron';
import { IEntry } from '@/model/Properties';

@Options({
  components: {
    Popper,
    PasswordGenerator,
    Entry
  },
})
export default class Panel extends Vue {

  newPasswordVisible: boolean = false;
  renderComponent: boolean = true;
  newEntryCommand: NewEntryCommand = new NewEntryCommand('', '', '', '');
  searchText: string = '';
  entries: EntryType[] = [];
  searchResult: EntryType[] = [];

  createNewEntry = async () => {
    const entry: EntryType = new EntryType(this.newEntryCommand.name, this.newEntryCommand.username, this.newEntryCommand.password,
        this.newEntryCommand.observaciones, false);
    this.entries.push(entry)

    await (<any>window).ipcRenderer.invoke('updateEntries', JSON.stringify(this.entries));
    this.loadEntries();

    this.newEntryCommand = new NewEntryCommand('', '', '', '');
  }


  isDisabled = (): boolean => {
    if (this.newEntryCommand.name == '') { return true; }
    return false;
  }

  async toggleNewEntryVisible() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  filter = () => {
    if (this.searchText == '') {
      this.searchResult = [];
      return;
    }
    this.searchResult = this.entries
      .filter(entry => entry.getName().toLowerCase().includes(this.searchText));
  }

  async deleteEntry(uuid: number) {
    this.entries = this.entries.filter(entry => entry.getUuid() != uuid);
    await (<any>window).ipcRenderer.invoke('updateEntries', JSON.stringify(this.entries));
    this.loadEntries()
  }

  async update(command: EditEntryCommand) {
    const entry = this.entries.filter(entry => entry.getUuid() == command.uuid)[0];
    entry.setName(command.name);
    entry.setUsername(command.username)
    entry.setPassword(command.password)
    entry.setDetails(command.observaciones);

    await (<any>window).ipcRenderer.invoke('updateEntries', JSON.stringify(this.entries));
    this.loadEntries();
  }

  async randomPassword() {
    this.newEntryCommand.password = PasswordGenerator.newPassword();
  }

  closeNewEntry() {
    this.newEntryCommand = new NewEntryCommand('', '', '', '');
  }

  async refresh() {
    this.renderComponent = false;
    await nextTick();
    this.renderComponent = true;
  }

  async mounted() {
    this.loadEntries();
  }

  async loadEntries() {
    const entries: IEntry[] = await (<any>window).ipcRenderer.invoke('loadEntries', {});
    this.entries = entries
      .map(ent => new EntryType(ent.name, ent.username, ent.password, ent.details, false, ent.uuid));
  }

}
</script>

<style scoped>
  .navbar {
    background-color: #244e54
  }

input {
  background-color: #384848 !important;
  color: white !important;
}

.search-input {
  background-color: #244e54 !important;
  border: none;
  border-bottom: 1px solid #0DB8DE;
  border-top: 0px;
  border-radius: 0px;
  outline: 0;
  padding-left: 5px;
  color: #ECF0F5;
}

input {
    background-color: #1A2226 !important;
    border: none;
    border-bottom: 0.5px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    outline: 0;
    padding-left: 0px;
    color: #ECF0F5;
}

textarea {
  background-color: #1A2226 !important;
    border: none;
    border-bottom: 0.5px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    outline: 0;
    padding-left: 5px;
    color: #ECF0F5 !important;
}

.btn-outline-primary {
    border-color: #0DB8DE;
    color: #0DB8DE;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-secondary {
    border-color: #909495;
    color: #909495;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>