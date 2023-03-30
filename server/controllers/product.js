import tryCatch from "./utils/tryCatch.js";
import Product from "../models/Product.js";

const DEFAULT_PARAMS = {
  // model: "gpt-3.5-turbo",
  model: "gpt-4",
};

export const createProduct = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const newProduct = new Product({ ...req.body, uid, uName, uPhoto });
  const prompt = "What will be career options after " + String(newProduct.name);
  // const prompt = `${newProduct.name} ${newProduct.criteria}`;
  // const params = {
  //   ...DEFAULT_PARAMS,
  //   messages: [
  //     {
  //       role: "system",
  //       content:
  //         "You are a helpful assistant who knows all brands and their products.",
  //     },
  //     {
  //       role: "user",
  //       content:
  //         "What are alternative products to " +
  //         String(newProduct.name) +
  //         " with key criteria for comparison as price. Also, mention price range for alternative products in the format Price range: $150-$250",
  //     },
  //     // {role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020."},
  //     // {role: "user", content: "Where was it played?"}
  //   ],
  // };
  const params = {
    ...DEFAULT_PARAMS,
    messages: [
      {
        role: "system",
        content: "Use your ability to provide answers",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(process.env.OPENAI_API_KEY),
    },
    body: JSON.stringify(params),
  };

  await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);
      const text = data.choices[0].message.content;
      console.log(text);
      newProduct.resultAI = text;
      await newProduct.save();
      res.status(201).json({ success: true, result: newProduct });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Something went wrong, Try later" });
    });
});

export const getProducts = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const products = await Product.find({ uid: uid }).sort({ _id: -1 });
  console.log("User products: " + products);
  res.status(200).json({ success: true, result: products });
});

export const getResponse = tryCatch(async (req, res) => {
  const { body } = req;
  const { query } = body;
  const response = await openAi.createCompletion({
    model: "text-davinci-003",
    prompt: query,
    max_tokens: 1000,
    temperature: 0,
  });

  res.json({
    data: response.data.choices[0].text,
  });
});

//to get image related data
