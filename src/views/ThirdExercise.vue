<template>
  <div class="exercise">
    <h1 class="exercise__title">Exercice 3</h1>
    <p class="exercise__description">Afficher la liste des posts de l'api de mock https://jsonplaceholder.typicode.com/. Ajouter un formulaire de création et les appels API correspondant pour un post. Ajouter une zone affichant le détail d'un post lorsqu'on le sélectionne dans la liste. Ajouter la possibilité de mettre à jour les champs modifiables d'un post. Ajouter la possibilité de supprimer un post.</p>
    <form @submit.prevent="handleSubmit" class="exercise__form">
      <input v-model="newPost.title" class="exercise__input" placeholder="Titre" required />
      <textarea v-model="newPost.body" class="exercise__textarea" placeholder="Contenu" required></textarea>
      <button type="submit" class="exercise__button">Ajouter un post</button>
    </form>
    <div class="exercise__content">
      <ul class="exercise__post-list">
        <li v-for="post in postStore.posts" :key="post.id" class="exercise__post" :class="{ 'exercise__post--selected': selectedPost?.id === post.id }">
          <div class="exercise__post-edit" v-if="editingPostId === post.id">
            <input v-model="post.title" placeholder="Modifier le titre" />
            <textarea v-model="post.body" placeholder="Modifier le contenu"></textarea>
            <div class="exercise__post-edit-buttons">
              <button @click="saveEdit(post.id)" class="exercise__button exercise__button--secondary">Enregistrer</button>
              <button @click="cancelEdit" class="exercise__button exercise__button--secondary">Annuler</button>
            </div>
          </div>
          <div v-else @click="selectPost(post)">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <button @click.stop="startEdit(post)" class="exercise__button exercise__button--secondary">Modifier</button>
            <button @click.stop="deletePost(post.id)" class="exercise__button exercise__button--secondary">Supprimer</button>
          </div>
        </li>
      </ul>
      <div v-if="selectedPost" class="exercise__post-details">
        <h2>Détails du post</h2>
        <h3>{{ selectedPost.title }}</h3>
        <p>{{ selectedPost.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePostStore } from '../stores/PostStore';
import { Post } from '../models/Post';

const postStore = usePostStore();
const newPost = ref({ title: '', body: '' });
const selectedPost = ref<Post | null>(null);
const editingPostId = ref<number | null>(null);

const handleSubmit = async () => {
  await postStore.addPost(newPost.value);
  newPost.value = { title: '', body: '' };
};

const selectPost = (post: Post) => {
  selectedPost.value = post;
};

const startEdit = (post: Post) => {
  editingPostId.value = post.id;
};

const saveEdit = async (id: number) => {
  const post = postStore.posts.find(p => p.id === id);
  if (post) {
    await postStore.editPost(id, { title: post.title, body: post.body });
  }
  editingPostId.value = null;
};

const cancelEdit = () => {
  editingPostId.value = null;
};

const deletePost = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
    await postStore.removePost(id);
    if (selectedPost.value?.id === id) {
      selectedPost.value = null;
    }
  }
};

onMounted(() => {
  postStore.loadPosts();
});
</script>

<style scoped>
.exercise {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.exercise__title {
  font-size: 2.5em;
  font-weight: bold;
  color: #007bff;
}

.exercise__description {
  font-size: 1.2em;
  text-align: center;
  color: #555;
}

.exercise__form {
  width: 100%;
  margin-bottom: 1.5rem;
}

.exercise__input, .exercise__textarea {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 2.5rem;
}

.exercise__textarea {
  min-height: 5rem;
}

.exercise__button {
  margin-right: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.exercise__button:hover {
  background-color: #0056b3;
}

.exercise__button--secondary {
  background-color: #fff;
  color: #007bff;
  border: 1px solid #007bff;
}

.exercise__button--secondary:hover {
  background-color: #e6f2ff;
}

.exercise__content {
  display: flex;
  gap: 2rem;
}

.exercise__post-list {
  list-style-type: none;
  padding: 0;
}

.exercise__post-edit {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.exercise__post-edit input {
  min-height: 2.5rem;
}

.exercise__post-edit textarea {
  min-height: 5rem;
}

.exercise__post {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.exercise__post:hover {
  background-color: #f0f0f0;
}

.exercise__post--selected {
  background-color: #e0f7fa;
}

.exercise__post-details {
  position: sticky;
  top: 20px;
  width: 33%;
  height: fit-content;
  flex-shrink: 0;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}
</style>
