import {Request, Response} from "express"
import {createMajor, getMajors, getMajor} from "../service/major"

const index = async (req: Request, res: Response) =>{
    try{
        const majors = await getMajors();
        res.render("major/index", {majors})
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}

const create = async (req: Request, res: Response) =>{
    if (req.method == "GET"){
        res.render("major/create")
    }else{
        try{
            await createMajor(req.body)
            res.redirect("/major")
        } catch(err){
            console.log(err);
            res.status(500).send(err)
        }
    }
}

const read = async (req: Request, res: Response) =>{
    const {id} = req.params
    try{
        const major = await getMajor(id)
        res.render("major/read", {major})
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}

const update = async (req: Request, res: Response) =>{}
const remove = async (req: Request, res: Response) =>{}

export default { index, create, read, update, remove}