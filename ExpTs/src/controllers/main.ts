import { Request, Response} from "express"

const hb1 = (req: Request, res: Response) => {
    res.render("main/hb1", {mensagem : "alguma mensagem"})
}

const testCookie = (req: Request, res: Response) => {
  if (!("test" in req.cookies)){
    res.cookie("test", "1")
    res.send("voce nao tinha o cookie, criando..")
  }else{
    res.send("voce ja tem o cookie")
  }
}
const hb2 = (req: Request, res: Response) => {
    res.render("main/hb2",{
      vencedorCaprichoso: false
    })
}

const hb3 = (req: Request, res: Response) => {
    const profs = [
      {name: "Davi Fernandes", room: 321},
      {name: "Altigran Soares", room: 321},
      {name: "Elaine Herada", room: 321},
      {name: "Horacio Fernandes", room: 321}
    ]
    res.render("main/hb3",{profs})
}

const hb4 = (req: Request, res: Response) => {
    const profs = [
      {name: "Davi Fernandes", room: 321},
      {name: "Altigran Soares", room: 321},
      {name: "Elaine Herada", room: 321},
      {name: "Horacio Fernandes", room: 321}
    ]
    res.render("main/hb4",{profs})
}

const bemVindo = (req: Request, res: Response) => {
    res.send(`Seja bem vindo(a) ${req.params.nome}`)
}

const about = (req: Request, res: Response) => {
    res.send("Página about");
}

export default {hb1, hb2, hb3, hb4, bemVindo, about, testCookie}