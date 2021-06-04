export const UsersData = [
  {
    _id: "abc1",
    userName: "rupam832",
    name: "Rupam Das",
    email: "rupam@gmail.com",
    password: "123",
    profileImg:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    coverImg:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Web Developer • JavaScript • React • Coding with @neogcamp • | Unreal Engine 4 • Game Design | Loves travelling",
    website: "rupamportfolio.com",
    followers: [],
    following: [],
  },
  {
    _id: "abc2",
    userName: "itsRealAman",
    name: "Aman Rai",
    email: "aman@gmail.com",
    password: "123",
    profileImg:
      "https://images.unsplash.com/photo-1581391528803-54be77ce23e3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    coverImg:
      "https://images.unsplash.com/photo-1622367037544-fbf8987e2e07?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Game Design | Loves travelling Web Developer • JavaScript • React • Coding with @neogcamp • | Unreal Engine 4 • ",
    website: "amanportfolio.com",
    followers: [],
    following: [],
  },
  {
    _id: "abc3",
    userName: "angelPriya",
    name: "Priya",
    email: "priya@gmail.com",
    password: "123",
    profileImg:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    coverImg:
      "https://images.unsplash.com/photo-1622495506073-56b1152a010c?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Coding with @neogcamp • Web Developer • JavaScript • React •  | Unreal Engine 4 • Game Design | Loves travelling",
    website: "priyaCodes.com",
    followers: [],
    following: [],
  },
  {
    _id: "abc4",
    userName: "karanRocks",
    name: "Karan Kumar",
    email: "karan@gmail.com",
    password: "123",
    profileImg:
      "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    coverImg:
      "https://images.unsplash.com/photo-1622512438776-9278e50863b9?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Web Developer • JavaScript • React • Coding with @neogcamp • | Unreal Engine 4 • Game Design | Loves travelling",
    website: "karizmaKaran.com",
    followers: [],
    following: [],
  },
];

export const PostsData = [
  {
    _id: "1",
    userName: "rupam832",
    name: "Rupam Das",
    profileImg:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    content:
      "The leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    likes: [
      {
        _id: "0scaasda",
        userName: "karanRocks",
      },
      {
        _id: "6sas",
        userName: "itsRealAman",
      },
      {
        _id: "6saaefs",
        userName: "angelPriya",
      },
    ],
    rePosts: 2,
    comments: [
      {
        _id: "ejh",
        userName: "itsRealAman",
        name: "Aman Rai",
        profileImg:
          "https://images.unsplash.com/photo-1581391528803-54be77ce23e3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        text: "Loved It",
      },
      {
        _id: "lkn",
        userName: "angelPriya",
        name: "Priya",
        profileImg:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        text: "Love to connect with you",
      },
    ],
  },
  {
    _id: "2",
    userName: "karanRocks",
    name: "Karan Kumar",
    profileImg:
      "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    content:
      "When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
    likes: [
      {
        _id: "lkn",
        userName: "angelPriya",
      },
      {
        _id: "0scdsaaasda",
        userName: "rupam832",
      },
    ],
    rePosts: 5,
    comments: [
      {
        _id: "0sca",
        userName: "rupam832",
        name: "Rupam Das",
        profileImg:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        text: "Hey It was Helpful",
      },
      {
        _id: "6sas",
        userName: "itsRealAman",
        name: "Aman Rai",
        profileImg:
          "https://images.unsplash.com/photo-1581391528803-54be77ce23e3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        text: "Really liked it",
      },
    ],
  },
];

export const NotificationsData = [
  {
    _id: "a",
    userId: "abc1",
    userName: "rupam832",
    items: [],
  },
  {
    _id: "b",
    userId: "abc2",
    userName: "itsRealAman",
    items: [],
  },
  {
    _id: "c",
    userId: "abc3",
    userName: "angelPriya",
    items: [],
  },
  {
    _id: "d",
    userId: "abc4",
    userName: "karanRocks",
    items: [],
  },
];
