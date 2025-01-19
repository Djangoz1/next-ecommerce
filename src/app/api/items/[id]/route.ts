import { getItemImagesQuery } from "@/api/gallery";
import {
  getItemByIdQuery,
  getItemMetadataByIdQuery,
  updateMetadataQuery,
} from "@/api/items";
import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  const id = params.id;
  try {
    const [item, gallery, metadata] = await Promise.all([
      getItemByIdQuery(Number(id)),
      getItemImagesQuery(Number(id)),
      getItemMetadataByIdQuery(Number(id)),
    ]);

    return NextResponse.json(
      {
        message: "OK",
        result: {
          ...item,
          gallery,
          metadata,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  const id = params.id;
  const body = await request.json();
  try {
    const item = await getItemByIdQuery(Number(id));

    const metadata = await getItemMetadataByIdQuery(Number(id));
    const {
      // ITEM
      name = item.name,
      type = item.type,
      stock = item.stock,
      description = item.description,
      abstract_description = item.abstract_description,
      main_image = item.main_image,
      discount = item.discount,
      price = item.price,

      // METADATA
      care = metadata.care.content,
      compo = metadata.compo.content,
      details = metadata.details.content,
      details_title = metadata.details.title,
      traceability = metadata.traceability.content,
      engagements = metadata.engagements.content,

      // MODEL
      centimeters_by_size = metadata.model.centimeters_by_size,
      dimension = metadata.model.dimension,
      model_name = metadata.model.name,
      regular = metadata.model.regular,
      size = metadata.model.size,
      tall = metadata.model.tall,
    } = body;

    if (!item) {
      throw new Error("Item not found");
    }
    let result;
    if (
      item.name !== name ||
      item.type !== type ||
      item.stock !== stock ||
      item.description !== description ||
      item.main_image !== main_image ||
      item.discount !== discount ||
      item.price !== price
    ) {
      if (!["dress", "miniature", "paint"].includes(type?.toLowerCase())) {
        throw new Error("Invalid type");
      }

      let params = {
        name: name === undefined ? item.name : name,
        description: description === undefined ? item.description : description,
        price: price === undefined ? item.price : price,
        stock: stock === undefined ? item.stock : stock,
        main_image: main_image === undefined ? item.main_image : main_image,
        discount: discount === undefined ? item.discount : discount,
        abstract_description:
          abstract_description === undefined
            ? item.abstract_description
            : abstract_description,
        type: type === undefined ? item.type : type,
      };
      const query = `
      UPDATE items
      SET name = $1, description = $2, price = $3, stock = $4, main_image = $5, discount = $6, abstract_description = $7, type = $8
      WHERE id = $9
    `;

      const values = [
        params.name,
        params.description,
        params.price,
        params.stock,
        params.main_image,
        params.discount,
        params.abstract_description,
        params.type,
        id,
      ];
      result = await pool.query(query, values);
    }

    let metadataUpdate = [];

    if (body.care) {
      metadataUpdate.push("care");
    }
    if (body.compo) {
      metadataUpdate.push("compo");
    }
    if (body.details) {
      metadataUpdate.push("details");
    }
    if (body.traceability) {
      metadataUpdate.push("traceability");
    }
    if (body.engagements) {
      metadataUpdate.push("engagements");
    }
    if (
      body.centimeters_by_size ||
      body.dimension ||
      body.size ||
      body.tall ||
      body.regular
    ) {
      metadataUpdate.push("model");
    }
    let metadataResult = [];

    console.log({ metadataUpdate });
    if (metadataUpdate.length) {
      for (const type of metadataUpdate) {
        const result = await updateMetadataQuery(
          Number(id),
          {
            care: {
              content: care,
              item_id: id,
              title: null,
              type: "care",
            },
            compo: {
              content: compo,
              item_id: id,
              title: null,
              type: "compo",
            },
            details: {
              content: details,
              item_id: id,
              title: details_title,
              type: "details",
            },
            traceability: {
              content: traceability,
              item_id: id,
              title: null,
              type: "traceability",
            },
            engagements: {
              content: engagements,
              item_id: id,
              title: null,
              type: "engagements",
            },
            model: {
              name: model_name,
              item_id: id,
              regular: regular,
              size: Number(size),
              tall: Number(tall),
              dimension: Number(dimension),
              centimeters_by_size: Number(centimeters_by_size),
            },
          }[type],
          type as any
        );
        metadataResult.push(result);
      }
    }

    return NextResponse.json(
      { message: "OK", result: { item: result, metadata: metadataResult } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  const id = params.id;
  try {
    let query = `DELETE FROM item_details WHERE item_id = $1`;
    let result = await pool.query(query, [id]);
    query = `DELETE FROM items WHERE id = $1`;
    result = await pool.query(query, [id]);
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
