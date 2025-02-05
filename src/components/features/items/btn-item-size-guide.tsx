import { Modal } from "@/components/ui/box/modal";
import { Tabs } from "@/components/ui/box/tabs";
import { Title } from "@/components/ui/typography/title";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

export const BtnItemSizeGuide = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <Modal
      btnProps={{
        variant: "link",
        size: "xs",
        className: cn("w-full", className),
        children: "Guide des tailles",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 items-center pb-10 text-center"
      >
        <Title className="px-10">Guide des tailles</Title>
        <Tabs
          className="text-xs"
          arr={[
            {
              title: "Les mesures à prendre",
              component: (
                <div className="text-center flex flex-col gap-5 w-full">
                  <p className="font-extralight text-xs">
                    Ne retenez pas votre respiration pendant la prise des
                    mesures* (et n'oubliez pas de compter 2 ou 3 centimètres en
                    plus pour pouvoir respirer, bouger, danser,...)
                  </p>
                  <Image
                    src="/icons/size-guide.avif"
                    alt="size-guide"
                    className="w-1/2 mx-auto"
                    width={1000}
                    height={1000}
                  />
                  <p className="font-extralight text-xs">
                    *Si vous n'avez pas de mètre de couturière, vous pouvez
                    prendre un ruban ou une ficelle, faire le tour, et mesurer
                    ensuite à plat avec une règle
                  </p>
                </div>
              ),
            },
            {
              title: "Mensurations",
              component: (
                <div className="flex flex-col gap-5 w-full">
                  <p className="font-extralight text-xs">
                    Voici les mensurations auxquelles correspondent nos tailles
                  </p>
                  <div
                    style={{
                      width: "100vw",
                      overflowX: "scroll",
                    }}
                    className="whitespace-nowrap overflow-x-scroll"
                  >
                    <table className="max-w-screen">
                      {[
                        {
                          title: "Mensurations",
                          values: ["34", "36", "38", "40", "42"],
                        },
                        {
                          title: "Tour de poitrine (CM)",
                          values: [
                            "77-81",
                            "82-86",
                            "87-91",
                            "92-96",
                            "97-101",
                          ],
                        },
                        {
                          title: "Tour de taille (CM)",
                          values: ["61-65", "66-70", "71-75", "76-80", "81-85"],
                        },
                        {
                          title: "Tour de bassin (CM)",
                          values: [
                            "86-90",
                            "91-95",
                            "96-100",
                            "101-105",
                            "106-110",
                          ],
                        },
                      ].map((el, index) => (
                        <tr
                          key={`table-size-guide-${index}`}
                          className={cn(
                            `flex w-full  px-5`,
                            index % 2 === 0 ? "bg-secondary" : "bg-background"
                          )}
                        >
                          <td
                            className={cn(
                              "py-2 text-xs font-semibold w-[150px] uppercase border-r",
                              index % 2 !== 0
                                ? "border-black"
                                : "border-black/50"
                            )}
                          >
                            {el.title}
                          </td>

                          {el.values.map((value, j) => (
                            <td
                              key={`table-size-guide-${index}-${j}`}
                              className="font-extralight  py-2 w-[90px] text-center text-xs"
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </table>
                  </div>
                  <p className="font-extralight text-xs">
                    *Si vous n'avez pas de mètre de couturière, vous pouvez
                    prendre un ruban ou une ficelle, faire le tour, et mesurer
                    ensuite à plat avec une règle
                  </p>
                </div>
              ),
            },
            {
              title: "Équivalence",
              component: (
                <div className="flex flex-col gap-5 w-full">
                  <div
                    style={{
                      width: "100vw",
                      overflowX: "scroll",
                    }}
                    className="whitespace-nowrap overflow-x-scroll "
                  >
                    <table className="max-w-screen">
                      {[
                        {
                          title: "Équivalence",
                          values: ["34", "36", "38", "40", "42"],
                        },
                        {
                          title: "États-Unis",
                          values: ["2", "4", "6", "8", "10"],
                        },
                        {
                          title: "Royaume-Uni",
                          values: ["6", "8", "10", "12", "14", "16"],
                        },
                        {
                          title: "Italie",
                          values: ["38", "40", "42", "44", "46", "48"],
                        },
                        {
                          title: "Allemagne",
                          values: ["32", "34", "36", "38", "40", "42"],
                        },
                        {
                          title: "Japon",
                          values: ["3", "5", "7", "9", "11", "13"],
                        },
                      ].map((el, index) => (
                        <tr
                          key={`table-size-guide-${index}`}
                          className={cn(
                            `flex w-full  px-5 relative`,
                            index % 2 === 0 ? "bg-secondary" : "bg-background"
                          )}
                        >
                          <td
                            className={cn(
                              " py-2 text-xs font-semibold w-[150px] uppercase border-r",
                              index % 2 !== 0
                                ? "border-black"
                                : "border-black/50"
                            )}
                          >
                            {el.title}
                          </td>
                          {el.values.map((value, j) => (
                            <td
                              key={`table-size-guide-${index}-${j}`}
                              className="font-extralight  py-2 w-[90px] text-center text-xs"
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </Modal>
  );
};
