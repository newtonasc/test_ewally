import BoletoController from "../Controllers/BoletoController";

export default (app: any) => {
    app.get('/boleto/:boleto', (req: any, res: any, next: any) => {
        try {
            const boletoController = new BoletoController(req.params.boleto);
            const data = boletoController.getResponseData();
            return res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    });
}