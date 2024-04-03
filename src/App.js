import React, { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [billValue, setBillValue] = useState("");
  const [expense, setExpense] = useState("");
  const [friends, setfriends] = useState(initialFriends);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({});

  let friendExpense = billValue - expense;
  // console.log());
  // console.log(expense);

  const handleFormOpen = () => setIsFormOpen(!isFormOpen);

  const handleAddFriend = (friend) => {
    setfriends((friends) => [...friends, friend]);
    setIsFormOpen(false);
  };

  const handleSelection = (friend) => {
    setSelectedFriend(friend);
  };

  // console.log(selectedFriend);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelection={handleSelection} />
        <FormAddFriend
          isFormOpen={isFormOpen}
          onAddFriend={handleAddFriend}
          // onFormOpen={setIsFormOpen}
        />
        <Button onClick={handleFormOpen}>
          {isFormOpen ? "Close" : "Add friend"}
        </Button>
      </div>
      <FormSplitBill
        selectedFriend={selectedFriend}
        expense={expense}
        friendExpense={friendExpense}
        billValue={billValue}
        onBillValue={setBillValue}
        onExpense={setExpense}
      />
    </div>
  );
}

function FriendsList({ friends, onSelection }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelection={onSelection} />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}$
        </p>
      )}
      {friend.balance === 0 && (
        <p className="">You and {friend.name} are even</p>
      )}
      <Button onClick={() => onSelection(friend)}>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ isFormOpen, onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=933372");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48?u=933372");
  }

  if (!isFormOpen) {
    return null;
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label> 🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({
  selectedFriend,
  onBillValue,
  onExpense,
  billValue,
  expense,
  friendExpense,
}) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => onBillValue(Number(e.target.value))}
      />

      <label>Your expense</label>
      <input
        type="text"
        value={expense}
        onChange={(e) => onExpense(Number(e.target.value))}
      />

      <label>{selectedFriend.name}'s expense</label>
      <input type="text" value={friendExpense} disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
