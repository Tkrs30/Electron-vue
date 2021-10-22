<template>
  <div id="app">
    <h1>Bonjour vous êtes sur la page 1 !</h1>
    <template v-if="getToken() === true">
      <br />
      <form @submit.prevent="getUrl" method="post">
        <div class="mb-3 pt-0">
          <a><h3>Entrez vos identifiants afin de recuperer vos infos</h3></a>
          <a>Entrez votre email :</a><br />
          <input
            v-model="email"
            class=""
          />
          <br />
          <a>Entrez votre Mot de passe :</a><br />
          <input
            v-model="password"
            class=""
            type="text"
          />
        </div>
        <button
          type="submit"
          class=""
        >
          Valider
        </button>
      </form>
    </template>
    <br />
    <button @click="getRelations">
      Relations
    </button>
    <br />
    <template v-if="relations != null">
      <li v-for="relation in relations" :key="relation.id">
        Nom du client : {{ relation.customer_name }}
        ( ID relation : {{ relation.id }} )
      </li>
    </template>
    <br />
    <form @submit.prevent="getOrderInfo" method="post">
      <div class="mb-3 pt-0">
        <h3>Entrez les identifiants de votre commande afin de recuperer les infos</h3>
        <a>Entrez l'id de la relation :</a><br />
        <input
          v-model="relation_id"
          class=""
          type="text"
        />
        <br />
        <a>Entrez la date de votre commande :</a><br />
        <input
          v-model="date"
          class=""
          type="text"
        />
      </div>
      <button
        type="submit"
        class=""
      >
        Valider
      </button>
    </form>
    <br />
    <button @click="logout">
      Relations
    </button>
    <template v-if="orderInfos != null">
      <a><h3>Commande(s) passé le {{ date }}</h3></a>
      <li v-for="orderInfo in orderInfos" :key="orderInfo.id">
        Client : {{ orderInfo.relation.customer_name }} <br />
        Id de relation : {{ orderInfo.relation.id }} <br />
        Numero de la commande : {{ orderInfo.id }} <br />
        Produits commandé : <br />
        <a v-for="orderInfoLine in orderInfo.lines" :key="orderInfoLine.id">
          Nom du produit : {{ orderInfoLine.product_name }} <br />
          Quantité : {{ orderInfoLine.quantity }} <br />
        </a>
      </li>
    </template>
    <div>
      <router-link class="button" to="/" append>Accueil</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
  data () {
    return {
      data: {},
      email: Vue.configApp.apiMercapro.email,
      password: Vue.configApp.apiMercapro.password,
      relation_id: '',
      date: '',
      token: null,
      relations: null,
      orderInfos: null
    }
  },
  mounted () {
  },
  methods: {
    getUrl: function (e) {
      if (this.password && this.email) {
        this.getData()
        return true
      }
      this.errors = []
      if (!this.password && !this.email) {
        this.errors.push('Email or Password required.')
      }
      e.preventDefault()
    },
    getOrderInfo: function (e) {
      if (this.date && this.relation_id) {
        this.getOrder()
        return true
      }
      this.errors = []
      if (!this.date && !this.relation_id) {
        this.errors.push('Email or Password required.')
      }
      e.preventDefault()
    },
    getToken () {
      this.token = this.$store.state.token

      if (this.token == null) {
        return true
      }
      return false
    },
    setToken () {
      this.$store.commit('setToken', this.token)
    },
    getOrder () {
      axios
        .get(Vue.configApp.apiMercapro.baseUrl + '/api/orders/' + this.relation_id + '/' + this.date, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
        .then((data) => {
          this.orderInfos = data.data
        })
    },
    getRelations () {
      axios
        .get(Vue.configApp.apiMercapro.baseUrl + '/api/relations', {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + this.token
          }
        })
        .then((data) => {
          this.relations = data.data
        })
    },
    getData () {
      axios
        .post(Vue.configApp.apiMercapro.baseUrl + '/api/login', {
          email: this.email,
          password: this.password
        })
        .then((data) => {
          this.token = data.data.token
          this.setToken()
        })
    },
    getLogout () {
      console.log(this.token)
      axios
        .post(Vue.configApp.apiMercapro.baseUrl + '/api/logout', {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + this.token
          }
        })
        .then((data) => {
          console.log('ca cest bien pasé')
        })
    },
    logout () {
      this.getLogout()
      /* this.$store.commit('unsetToken') */
    }
  }
}
</script>

<style>
  
</style>