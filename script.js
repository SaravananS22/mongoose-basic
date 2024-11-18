const mongoose=require('mongoose')
const User=require('./user.js');

mongoose.connect('mongodb://localhost/testdb');

// const user=new User({
//     name:'Kyle',
//     age:26
// })

// user.save().then(()=>console.log('User Saved'))

// 1 save() is async

// run()

// async function run(){
//     // const user=new User({
//     //     name:"Kyle",
//     //     age:26
//     // })
//     // await user.save()
//     // the following code doing the same thing
//     const user=await User.create({name:'Kyle',age:26})
//     // how to update
//     await user.save()
//     user.name='Sally'
//     // this only updated in the local object only
//     // how update in the DB
//     console.log(user)
// }

// step connected with datadase
// mongoose.connect('mongodb://localhost/testdb',
//     ()=>{
//         console.log('Connected')// connect() no longer accepts a callback
//     },
//     e=>console.log(e)
// );

// 3 main concepts
// 1 schema -> find what structure of your data db accepts
// 2 modal -> schema in actual format that can use
// modal is indiviual user object in the database
// 3 query -> query the mongoDB database

run()
// async function run(){
//     // findOne,updatedById they skip the validate
//     // because they directly communicated with DB
//     try {
//         const user = await User.create({
//             name:'Kyle',
//             age:28,
//             email:'TEST@test.com',
//             hobbies:['Weight Lifting','Bowling'],
//             address:{
//                 street:'Main St'
//             }
//         })
//         user.createdAt=5;
//         await user.save()
//         console.log(user)
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// async function run(){
//     // findOne,updatedById they skip the validate
//     // because they directly communicated with DB
//     // use findById()
//     try {
//         // const user = await User.findById('673abba8cc536bf7df84c3c1')
//         // or mongoBD way
//         // const user = await User.findOne({name:'Kyle'})
//         // const user = await User.exists({name:'Kyle'})
//         // if the name is present or not
//         // const user = await User.deleteOne({name:'Kyle'});
//         // is useFul

//         // queries
//         // const user=await User.where("name").equals("Kyle")
//         // const user=await User.where("age").gt(12).lt(30).where("name").equals("kyle")
//         const user=await User.where("age")
//             .gt(12)
//             .where("name")
//             .equals("Kyle")
//             .populate("bestFriend")
//             .limit(1)
//             // .select("age")
//             // user[0].bestFriend = "673ab7cbd850649f8c943910"
//             // await user[0].save()
//             // after save this store in the DB
//             // bestFriend: new ObjectId('673ab7cbd850649f8c943910')
//             // now only the id is present in our DB
//             // how to get the another object data in the bestFriend
//             // use populate method 
//             // and pass the key(bestFriend)
//             user.sayHi()
//         console.log(user) // deletedCount:1
//     } catch (error) {
//         console.log(error.message)
//     }
// }

async function run(){
    try{
        // normal
        // const user = await User.findOne({name:'Kyle'});
        // static method
        // const user = await User.findByName('Kyle')

        // query must provide find() or where()
        // if not it gives an error

        // const user = await User.find().byName("Kyle")
        //// Find all users with a name matching "Kyle" (case-insensitive)

        // virtual
        const user=await User.findOne({name:'Kyle',email:'test@test.com'});
        console.log(user.updatedAt)
        console.log(user.namedEmail)
        await user.save()
        // user.sayHi()
    }catch(error){
        console.log(error.message)
    }
}

// mongoose provide the query
// modify the schema