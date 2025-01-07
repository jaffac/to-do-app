<script>
	import { onMount } from 'svelte';
	import { supabase } from '../lib/supabaseClient';

	let todos = [];
	let newTodo = '';
	let userId = null;

	onMount(async () => {
		const {
			data: { user },
			error
		} = await supabase.auth.getUser();
		if (error || !user) {
			window.location.href = '/login'; // Redirect to login page if not authenticated
			return;
		}
		userId = user.id;
		const { data, error: fetchError } = await supabase
			.from('todos')
			.select('*')
			.eq('user_id', userId);
		if (fetchError) {
			console.error('Error fetching todos:', fetchError);
		} else {
			todos = data;
		}
	});

	async function addTodo() {
		if (newTodo.trim() === '') return;
		const response = await supabase
			.from('todos')
			.insert([{ text: newTodo, completed: false, user_id: userId }]);
		console.log('Insert response:', response);
		const { error } = response;
		if (error) {
			console.error('Error adding todo:', error);
		} else {
			// Fetch todos again to update the UI
			const { data, error: fetchError } = await supabase
				.from('todos')
				.select('*')
				.eq('user_id', userId);
			if (fetchError) {
				console.error('Error fetching todos:', fetchError);
			} else {
				todos = data;
			}
			newTodo = '';
		}
	}

	async function toggleTodo(id) {
		const todo = todos.find((todo) => todo.id === id);
		const response = await supabase
			.from('todos')
			.update({ completed: !todo.completed })
			.eq('id', id)
			.eq('user_id', userId);
		console.log('Update response:', response);
		const { error } = response;
		if (error) {
			console.error('Error toggling todo:', error);
		} else {
			// Update the local state directly
			todos = todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			);
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

<div class="app">
	<h1>My List</h1>
	<div class="add-todo">
		<input
			type="text"
			placeholder="Add a new to-do"
			bind:value={newTodo}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					addTodo();
				}
			}}
		/>
		<button on:click={addTodo}>Add</button>
	</div>

	<ul class="todo-list">
		{#each todos as todo (todo.id)}
			<li class:completed={todo.completed}>
				<input type="checkbox" checked={todo.completed} on:change={() => toggleTodo(todo.id)} />
				<span class="todo-text">{todo.text}</span>
				<button class="delete-button" on:click={() => deleteTodo(todo.id)}>Delete</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.app {
		font-family: sans-serif;
		background-color: #333;
		color: #eee;
		padding: 20px;
		border-radius: 8px;
		width: 90%;
		max-width: 600px;
		margin: 2rem auto;
	}

	h1 {
		text-align: center;
		margin-bottom: 20px;
	}

	.add-todo {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	.add-todo input {
		flex: 1;
		padding: 10px;
		border: none;
		border-radius: 4px;
		margin-right: 10px;
	}

	.add-todo button {
		padding: 10px 20px;
		border: none;
		border-radius: 4px;
		background-color: #28a745;
		color: white;
		cursor: pointer;
	}

	.add-todo button:hover {
		background-color: #218838;
	}

	.todo-list {
		list-style: none;
		padding: 0;
	}

	.todo-list li {
		display: flex;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid #444;
	}

	.todo-list li:last-child {
		border-bottom: none;
	}

	.todo-list input[type='checkbox'] {
		margin-right: 10px;
	}

	.todo-list .todo-text {
		flex: 1;
	}

	.todo-list li.completed .todo-text {
		text-decoration: line-through;
		color: #aaa;
	}

	.delete-button {
		background-color: #cc3333;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 5px 10px;
		cursor: pointer;
	}

	.delete-button:hover {
		background-color: #aa3333;
	}
</style>
