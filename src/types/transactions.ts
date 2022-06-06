/*
Copyright 2018 - 2022 The Alephium Authors
This file is part of the alephium project.

The library is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with the library. If not, see <http://www.gnu.org/licenses/>.
*/

import { BuildDeployContractTxData } from '../modals/SendModal/BuildDeployContractTx'
import { BuildScriptTxData } from '../modals/SendModal/BuildScriptTx'
import { BuildTransferTxData } from '../modals/SendModal/BuildTransferTx'
import { NetworkName } from '../utils/settings'

export enum TxType {
  TRANSFER,
  DEPLOY_CONTRACT,
  SCRIPT
}

export type PendingTxType = 'consolidation' | 'transfer' | 'sweep' | 'contract'

export type PendingTx = {
  txId: string
  fromAddress: string
  timestamp: number
  type: PendingTxType
  network: NetworkName
  toAddress?: string
  amount?: bigint
}

export type DappTxData = BuildTransferTxData | BuildDeployContractTxData | BuildScriptTxData

export type TxDataToModalType =
  | {
      modalType: TxType.TRANSFER
      txData: BuildTransferTxData
    }
  | {
      modalType: TxType.DEPLOY_CONTRACT
      txData: BuildDeployContractTxData
    }
  | {
      modalType: TxType.SCRIPT
      txData: BuildScriptTxData
    }
