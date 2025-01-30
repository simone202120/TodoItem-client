import React from "react"
import {updateTodoItem, IupdateTodoItemInput} from "../../api";
import { useState } from "react";
import "./todoItems.css";

const updateTodoItems : React.FC<{onUpdate: () => void}> = ({ onUpdate })=>{
return(
	<div className="update-form">
		<form>
			<input type="text" placeholder="Update todo item..." />
			<button type="submit">Update</button>
		</form>
	</div>
);
};
export default updateTodoItems;