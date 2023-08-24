import FileUploadmodel from "../models/FileUploadmodel.js"
import path from "path";
import xlsx from 'xlsx'
// file upload controller
export const fileUpload=async(req,res)=>{
    let files=req.files
    await files.forEach(async(file,id) => {
        // console.log(file )
        // console.log(path.join(process.cwd(),'uploads',`${file.originalname}`))
        const wb = xlsx.readFile(path.join(process.cwd(),'uploads',`${file.originalname}`) 
        ,{
            type: 'binary',
            cellDates: true,
            cellNF: true,
            cellText: true
        },'utf-8');
        const wsname = wb.SheetNames[id];
        // console.log('at',wsname )        
        const ws = wb.Sheets[ wsname ];
        // console.log(ws )
        const data = xlsx.utils.sheet_to_json( ws );
        // console.log(data);
        let file_name=file.originalname;
        let new_file={
            name:file_name,
            data:data
        }
        const ext_file=await FileUploadmodel.findOne({name:file_name})
        if(!ext_file){
            const createfile=await FileUploadmodel.create(new_file);
            if(createfile&&files.length-1==id){
                return res.status(200).send({
                    sucess:true,
                    message:"file Uploaded Sucessfully..",
                    files
                })
            }
        }
        if(ext_file){
            // res.setHeader('hi','hi')
            return res.status(400).send({
                sucess:false,
                message:"file Already Exists",
                file_name
            })
        }
    })
}
// fetch all files and file data controller
export const filefetch=async(req,res)=>{
    const fileusers=await FileUploadmodel.find();
    res.status(200).send({
        sucess:true,
        message:"All File Users",
        fileusers
    })
}
/*gets the data that is needed to delete the 
specific user data in array data
*/
export const deletedata=async(req,res,next)=>{
    try{
        const {name,index}=req.body
        await settingdata(name,index);
        next()
    }catch(err){
        console.log("Error at detetedata function",err)
    }
}
let filename;
let arrindex;
// setting the needed data to delete
async function settingdata(name,index){
    filename=await name
    arrindex=await index
    // console.log(filename)
    // console.log(arrindex)
}
// delete controller to delete specific array data
export const deleteuser=async(req,res)=>{
try{
    let {id}=req.params;
    // let {...body}=req.body
    // console.log(Object.entries(req.body))
    console.log(id)
    let fileid=id
    console.log(arrindex)
    console.log(filename)
    let ext_file=await FileUploadmodel.findOne({_id:id})
    if(ext_file){
        ext_file.data.forEach(async(array,id)=>{
            if(arrindex==id){
                console.log(id)
                console.log(array)
                console.log(ext_file.data[id])
                let data=FileUploadmodel.findOne({_id:fileid,data:id})
                let delindex=await FileUploadmodel.updateOne({_id:fileid},{$pull:{data:ext_file.data[id]}})
            }
        })
        res.status(200).send({
            sucess:true,
            message:"deleted the user...",
            id
        })
    }if(!ext_file){
        res.status(400).send({
            sucess:false,
            message:"No File Available with this id or Name",
            id
        })
    }
    // console.log(ext_file.data[0])
}catch(err){
    console.log(err)
}
}

export const deletefile=async(req,res)=>{
    try{
        const {id}=req.params
        console.log(id)
        let ext_file=await FileUploadmodel.findOne({_id:id})
        console.log(ext_file.name)
        if(!ext_file){
            // console.log("file not found")
            res.status(400).send({
                sucess:false,
                message:"file NOT FOUND",
                id
            })
        }
        if(ext_file){
            let del_file=await FileUploadmodel.deleteOne({_id:id})
            // if(del_file){
                res.status(200).send({
                    sucess:true,
                    message:"file deleted..",
                    filename:ext_file.name,
                    del_file
                })
            // }
        }
    }catch(err){
        console.log('at file delete',err)
    }

}

export const updatefiledata = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const { index,olddata,data } = req.body
        console.log(index,olddata,data)
        if (!data) {
            console.log("NO data to update...")
        }
        const file = await FileUploadmodel.findOne({ _id: id })
        if (!file) {
            console.log("NO File Found")
        }
        console.log(file.data[index])
        let oldata=file.data[index]
        let values=JSON.stringify(file.data[index]) === JSON.stringify(oldata)
        console.log('matching old values',values)
        // let newvalues={data}
        const updatefiledata = await FileUploadmodel.updateOne({_id:id},{$set: { [`data.${index}`]: data }},{multi:true})
        console.log(updatefiledata)
        res.status(200).json({
            sucess: true,
            message:"Added new Values",
            data
        })

    }
    catch (err) {
        console.log(err)
    }
}