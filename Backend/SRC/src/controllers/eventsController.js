import eventModel from "../Models/events.js"

const eventController = {}

eventController.getEvents = async (req, res) =>{ 
    try {
        const page = parseInt(req.body.page) || 1
        const limit = parseInt(req.body.limit) || 20

        const skip = (page - 1) * limit

        const Events = await eventModel.find().skip(skip).limit(limit)

        return res.status(200).json(Events);
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "INternal server error"})
    }
}

eventController.insert = async (req, res) =>{ 
    try {
       
        let {
        CustomerName, 
        cantProducts, 
        eventDate} = req.body

        const newEvent = new eventModel({
            CustomerName, 
            cantProducts, 
            eventDate
        })
        
        await newEvent.save()

        return res.status(200).json({message: "Evento Guardado"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "INternal server error"})
    }
}

eventController.delete = async (req, res) =>{ 
    try {
        //Buscamos el repartidos a eliminar
        const eventFound = eventModel.findById(req.params.insert)
        
        //eliminamos el repartidor de la base de datos
        await eventModel.findByIdAndDelete(req.params.id)
        
        return res.status(200).json({message: "Event deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "INternal server error"})
    }
}

eventController.update = async (req, res) =>{ 
    try {
        //Solicito los nuevos datos
        let {
        CustomerName, 
        cantProducts, 
        eventDate} = req.body


        //Identificar el repartidor a actualizar
        const eventFound = await eventModel.findById(req.params.id)

        const updateEvent = {
            CustomerName, 
            cantProducts, 
            eventDate
        }

        //Guardamos todo en la base de datos
        await eventModel.findByIdAndUpdate(
            req.params.id,
            {new: true}
        )

        return res.status(200).json({message: "Event updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default eventController