/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Order } from "@/types/ICDAutomation"
import { PDFDocument, type PDFPage, rgb } from "pdf-lib"

const pdfUrl = "public/UCAF2.0.pdf"

const generateTestGrid = (
  rows: number,
  cols: number,
  leftMost: number,
  rightMost: number,
  topMost: number,
  bottomMost: number
) => {
  const points = []
  const xStep = (rightMost - leftMost) / (cols - 1)
  const yStep = (topMost - bottomMost) / (rows - 1)

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      points.push({
        label: `R${r + 1}-C${c + 1}`,
        x: leftMost + c * xStep,
        y: topMost - r * yStep
      })
    }
  }

  return points
}
const addTestPoints = (page: PDFPage) => {
  const testPositions = generateTestGrid(55, 22, 80, 470, 710, 280)
  for (const position of testPositions) {
    const { label, x, y } = position
    page.drawText(`${label} (${Math.round(x)}, ${Math.round(y)})`, {
      x,
      y,
      size: 1,
      color: rgb(1, 0, 0)
    })
  }
}

type DiagnosesCodes = {
  principalCode: string
  secondCode: string
  thirdCode: string
  fourthCode: string
}

type FormValues = {
  diagnosesCodes: DiagnosesCodes
  orders: Order[]
}

export async function exportUcafForm(formValues: FormValues) {
  const { diagnosesCodes, orders } = formValues

  // Fetch and load the existing PDF
  const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const page = pdfDoc.getPages()[0]

  //   addTestPoints(page)

  drawDiagnosesCodes(page, diagnosesCodes)
  drawOrders(page, orders)

  const pdfBytes = await pdfDoc.save()

  // Create a Blob and trigger download
  const blob = new Blob([pdfBytes], { type: "application/pdf" })
  const blobUrl = URL.createObjectURL(blob)
  window.open(blobUrl, "_blank")
}

const drawDiagnosesCodes = (page: PDFPage, diagnosesCodes: DiagnosesCodes) => {
  const { principalCode, secondCode, thirdCode, fourthCode } = diagnosesCodes

  const coordsConfig = {
    y: 492,
    size: 7,
    color: rgb(0, 0, 0)
  }

  const xCoords = {
    principalCode: 128,
    secondCode: 241,
    thirdCode: 340,
    fourthCode: 447
  }

  page.drawText(principalCode ?? "", {
    x: xCoords.principalCode,
    ...coordsConfig
  })

  page.drawText(secondCode ?? "", {
    x: xCoords.secondCode,
    ...coordsConfig
  })

  page.drawText(thirdCode ?? "", {
    x: xCoords.thirdCode,
    ...coordsConfig
  })

  page.drawText(fourthCode ?? "", {
    x: xCoords.fourthCode,
    ...coordsConfig
  })
}

const drawOrders = (page: PDFPage, orders: Order[]) => {
  const orderYPositions = [393, 380, 367]

  const coordsConfig = {
    size: 7,
    color: rgb(0, 0, 0)
  }

  // biome-ignore lint/complexity/noForEach: <explanation>
  orders.forEach((ord, idx) => {
    const codeXPosition = 83
    const descXPosition = 145

    page.drawText(ord.code, {
      x: codeXPosition,
      y: orderYPositions[idx],
      ...coordsConfig
    })

    page.drawText(ord.name, {
      x: descXPosition,
      y: orderYPositions[idx],
      ...coordsConfig
    })
  })
}
