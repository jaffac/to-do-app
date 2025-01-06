<script>
	import { onMount } from 'svelte';
	import { supabase } from './supabaseClient';

	let todos = [];
	let newTodo = '';
	let userId = null;

	onMount(async () => {
		const user = supabase.auth.user();
		if (user) {
			userId = user.id;
			const { data, error } = await supabase.from('todos').select('*').eq('user_id', userId);
			if (error) {
				console.error('Error fetching todos:', error);
			} else {
				todos = data;
			}
		}
	});

	async function addTodo() {
		if (newTodo.trim() === '') return;
		const { data, error } = await supabase
			.from('todos')
			.insert([{ text: newTodo, completed: false, user_id: userId }]);
		if (error) {
			console.error('Error adding todo:', error);
		} else {
			todos = [...todos, ...data];
			newTodo = '';
		}
	}

	async function toggleTodo(id) {
		const todo = todos.find((todo) => todo.id === id);
		const { data, error } = await supabase
			.from('todos')
			.update({ completed: !todo.completed })
			.eq('id', id)
			.eq('user_id', userId);
		if (error) {
			console.error('Error toggling todo:', error);
		} else {
			todos = todos.map((todo) => (todo.id === id ? data[0] : todo));
		}
	}

	async function deleteTodo(id) {
		const { error } = await supabase.from('todos').delete().eq('id', id).eq('user_id', userId);
		if (error) {
			console.error('Error deleting todo:', error);
		} else {
			todos = todos.filter((todo) => todo.id !== id);
		}
	}
</script>
