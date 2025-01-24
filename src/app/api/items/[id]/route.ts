import { getItemImagesQuery } from "@/api/gallery";
import {
  getItemByIdQuery,
  getItemMetadataByIdQuery,
  updateMetadataQuery,
} from "@/api/items";
import { ItemMetadata } from "@/types/items";
import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

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

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

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

      const params = {
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
      result = await pool.from("items").update(values).eq("id", id).select();
    }

    const metadataUpdate = [];

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
    const metadataResult = [];

    console.log({ metadataUpdate });
    if (metadataUpdate.length) {
      for (const type of metadataUpdate) {
        const result = await updateMetadataQuery(
          Number(id),
          {
            care: {
              content: care,

              title: null,
            },
            compo: {
              content: compo,

              title: null,
            },
            details: {
              content: details,

              title: details_title,
            },
            traceability: {
              content: traceability,

              title: null,
            },
            engagements: {
              content: engagements,

              title: null,
            },
            model: {
              name: model_name,
              regular: regular,
              size: Number(size),
              tall: Number(tall),
              dimension: Number(dimension),
              centimeters_by_size: Number(centimeters_by_size),
            },
          }[type as keyof ItemMetadata],
          type as
            | "details"
            | "compo"
            | "care"
            | "traceability"
            | "engagements"
            | "model"
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

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  try {
    let result = await pool
      .from("item_details")
      .delete()
      .eq("item_id", id)
      .select();

    result = await pool.from("items").delete().eq("id", id).select();
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
