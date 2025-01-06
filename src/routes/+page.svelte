<script>
	let todos = [];
	let newTodo = '';

	function addTodo() {
		if (newTodo.trim() === '') return;
		todos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
		newTodo = '';
	}

	function toggleTodo(id) {
		todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
	}

	function deleteTodo(id) {
		todos = todos.filter((todo) => todo.id !== id);
	}
</script>

<div class="app">
	<h1>Welcome to My List</h1>
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
		gap: 10px;
		margin-bottom: 15px;
	}

	input[type='text'] {
		padding: 10px;
		border: 1px solid #555;
		background-color: #444;
		color: #eee;
		border-radius: 4px;
		flex: 1;
	}
	input[type='text']:focus {
		outline: none;
		border-color: #888;
	}

	button {
		padding: 10px 15px;
		border: none;
		background-color: #555;
		color: #eee;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s;
	}
	button:hover {
		background-color: #777;
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
	}

	.delete-button:hover {
		background-color: #aa3333;
	}
</style>
