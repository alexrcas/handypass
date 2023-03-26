<template v-if="renderComponent">
  <nav class="navbar navbar-expand bg-primary text-light py-1">
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
          <input class="form-control form-control-sm me-2" type="search" placeholder="Buscar..." v-model="searchText"
            @keyup="filter()" aria-label="Search">
        </form>
      </div>
    </div>
  </nav>


  <div class="container-fluid mt-4">

    <template v-if="!searchText" v-for="entry in entries">
      <template v-if="renderComponent">
        <Entry :entry="entry" @onDeleteEntry="deleteEntry" @onUpdateEntry="update" />
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
      <div class="modal-content">
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
                <input :type="newEntryCommand.visible ? 'text' : 'password'" v-model="newEntryCommand.password"
                  class="form-control form-control-sm" id="colFormLabelSm" placeholder="Password">
                <div class="input-group-text" @click="randomPassword()">
                  <i class="fa-solid fa-dice"></i>
                </div>
                <div class="input-group-text" :class="newEntryCommand.visible ? 'active' : ''"
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
          <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal"
            @click="closeNewEntry()">Cancelar</button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click=createNewEntry()
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

@Options({
  components: {
    Popper,
    PasswordGenerator,
    Entry
  },
})
export default class HelloWorld extends Vue {

  renderComponent: boolean = true;
  newEntryCommand: NewEntryCommand = new NewEntryCommand('', '', '', '', false);
  searchText: string = '';
  entries: EntryType[] = [];
  searchResult: EntryType[] = [];

  createNewEntry = () => {
    this.entries.push(
      new EntryType(this.newEntryCommand.name, this.newEntryCommand.username, this.newEntryCommand.password,
        this.newEntryCommand.observaciones, this.newEntryCommand.visible)
    );
    this.newEntryCommand = new NewEntryCommand('', '', '', '', false);
  }


  isDisabled = (): boolean => {
    if (this.newEntryCommand.name == '') { return true; }
    return false;
  }

  async toggleVisible(entry: EntryType) {
  }

  async toggleNewEntryVisible() {
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
    this.renderComponent = false;
    this.entries = this.entries.filter(entry => entry.getUuid() != uuid);
    await nextTick();
    this.renderComponent = true;
  }

  async update(command: EditEntryCommand) {
    this.renderComponent = false;

    const entry = this.entries.filter(entry => entry.getUuid() == command.uuid)[0];
    entry.setName(command.name);
    entry.setUsername(command.username)
    entry.setPassword(command.password)
    entry.setObservaciones(command.observaciones);

    await nextTick();
    this.renderComponent = true;
  }

  randomPassword() {
    this.newEntryCommand.password = PasswordGenerator.newPassword();
  }

  closeNewEntry() {
    this.newEntryCommand = new NewEntryCommand('', '', '', '', false);
  }

}
</script>