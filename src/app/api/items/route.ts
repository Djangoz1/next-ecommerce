import {
  createMetadataQuery,
  getAllItemsQuery,
  getItemByTypeQuery,
} from "@/api/items";
import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  try {
    let items;
    if (type) {
      items = await getItemByTypeQuery(type as string);
    } else {
      items = await getAllItemsQuery();
    }
    return NextResponse.json({ message: "OK", result: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const {
      name,
      type,
      stock,
      description,
      abstract_description,
      main_image,
      discount,
      price,

      // METADATA
      care,
      compo,
      details,
      details_title,
      traceability,
      engagements,

      // MODEL
      centimeters_by_size,
      dimension,
      model_name,
      regular,
      size,
      tall,
    } = body;

    const values = [
      name,
      type,
      stock,
      description,
      abstract_description,
      main_image,
      discount,
      price,
    ];

    const result = await pool.from("items").insert(values).select();

    const itemId = result.data?.[0].id;

    const [_care, _compo, _details, _traceability, _engagements, _model] =
      await Promise.all([
        createMetadataQuery(
          itemId,
          {
            content: care,
            title: null,
          },
          "care"
        ),
        createMetadataQuery(
          itemId,
          {
            content: compo,
            title: null,
          },
          "compo"
        ),
        createMetadataQuery(
          itemId,
          {
            content: details,
            title: details_title,
          },
          "details"
        ),
        createMetadataQuery(
          itemId,
          {
            content: traceability,
            title: null,
          },
          "traceability"
        ),
        createMetadataQuery(
          itemId,
          {
            content: engagements,
            title: null,
          },
          "engagements"
        ),
        createMetadataQuery(
          itemId,
          {
            name: model_name,
            regular: regular,
            size: size,
            tall: tall,
            dimension: dimension,
            centimeters_by_size: centimeters_by_size,
          },
          "model"
        ),
      ]);

    return NextResponse.json(
      {
        message: "OK",
        result: {
          item: result.data?.[0],
          metadata: [
            _care,
            _compo,
            _details,
            _traceability,
            _engagements,
            _model,
          ],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
