import xlsx from 'xlsx'

interface PostInterface {
    title: string | undefined | null,
    no: number | undefined | null | string,
    kelas: number | undefined | null | string,
}

const filepath = process.argv.slice(2)[0]

// console.log(filepath, 1)

const workbook = xlsx.readFile(filepath)

// console.log(workbook, 2)

// console.log(workbook.SheetNames[0])

const worksheet = workbook.Sheets[workbook.SheetNames[0]]

// console.log(worksheet, 3)

let posts = []
let post: PostInterface = {title: "", no: "", kelas: ""}

for (let cell in worksheet){
    const cellAsString:string = cell.toString()
    const cellAsNumber:number = parseInt(cell[1])
    // console.log(cellAsString[1], 4)
    // console.log(cellAsString, 5)
    // console.log(cellAsNumber)

    if(cellAsString[1] !== "r" && cellAsString != "m" && cellAsNumber > 1){
        if(cellAsString[0] === "A"){
            post.title = worksheet[cell].v
        }

        if(cellAsString[0] === "B"){
            post.no = worksheet[cell].v
        }

        if(cellAsString[0] === "C"){
            post.kelas = worksheet[cell].v
            posts.push(post)
            post = {title: "", no: "", kelas: ""}
        }

    }
}

console.log(posts)